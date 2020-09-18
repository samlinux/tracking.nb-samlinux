/**
 * Scan-Simulation
 * @ostriessnig
 */

// ----------------------------------------
// requirements
// ---------------------------------------- 
// We include some requirement.
const q = require('q');
const _ = require('lodash');
const Agenda = require('agenda');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const bunyan = require("bunyan");
const log = bunyan.createLogger({ name: 'scan-simulation-logging' });

// We include our config file.
const config = require('../.config.json');

startSimulation();

async function startSimulation() {
    // Check CLI-Params
    let paramsValid;
    let currentRfid;
    const rfidPrefix = process.argv[2];
    const rfidStart = parseInt(process.argv[3]);
    const rfidSteps = parseInt(process.argv[4]);
    if (rfidPrefix && rfidStart && rfidSteps) {
        if (_.isNumber(rfidStart) && _.isNumber(rfidSteps)) {
            if (rfidStart > 0 && rfidSteps > 0) {
                paramsValid = true;
            }
        }
    }
    if (!paramsValid) {
        throw new Error('given CLI params do not match the criteria: rfid-prefix<string> rfid-start<number> rfid-steps<number>');
    }
    // MongoDB - establish connection
    const dbConn = await getMongoDbConn();
    // dbConn - set collection
    const collection = encodeURIComponent(_.get(config, 'scanSimulation.dbCollection', 'colTracking2Test'));
    const dbCol = dbConn.collection(collection);
    // Start Agenda Interval
    const agenda = new Agenda({ mongo: dbConn });
    agenda.define('simulate scan', async job => {
        if (!currentRfid) {
            currentRfid = rfidStart;
        }
        // console.log('next rfid: ' + currentRfid);
        currentRfid = insertTransitStationsForRfid(dbCol, rfidPrefix, currentRfid, rfidSteps);
    });
    // console.log('do agenda job every ' + (_.get(config, 'scanSimulation.scanInterval', '10 minutes')) + '...');
    (async function () {
        await agenda.start();
        // 5 seconds are the lowest number, because of the locktime
        await agenda.every((_.get(config, 'scanSimulation.scanInterval', '10 minutes')), 'simulate scan');
    })();
}

function insertTransitStationsForRfid(dbCol, prefix, current, steps) {
    const startNumber = current;
    const endNumber = current + steps;
    /**
     * identities:
     * 1. freight_forwarder_warehouse - Freight forwarder warehouse
     * 2. truck - Truck
     * 3. export_docks Export - docks
     * 4. storage_location - Storage location
     * 5. loaded_in_trolley - Loaded in trolley
     * 6. aircraft_bay - Aircraft bay
     * 7. loaded_into_aircraft - Loaded into aircraft
     * 8. aircraft_takeoff - Aircarft takeoff
     */
    const identities = [
        'freight_forwarder_warehouse', 'truck', 'export_docks', 'storage_location',
        'loaded_in_trolley', 'aircraft_bay', 'loaded_into_aircraft', 'aircraft_takeoff'
    ];
    const scannedStart = new Date();
    scannedStart.setHours(scannedStart.getHours() - identities.length);
    // Start generating insert-documents
    const scanned = scannedStart;
    log.info('new scan simulation');
    identities.forEach(identity => {
        const insertDocs = [];
        for (let i = startNumber; i < endNumber; i++) {
            insertDocs.push({
                rfid: (prefix + i.toString()),
                identity: identity,
                scanned: scanned.toISOString()
            });
        }
        scanned.setHours(scanned.getHours() + 1);
        if (insertDocs.length > 0) {
            dbCol.insertMany(insertDocs).then(result => {
                log.info('Successfully inserted ' + insertDocs.length + ' scans in identity: ' + identity);
            }).catch(err => {
                throw new Error(err);
            });
        }
    });
    return endNumber;
}

function getMongoDbConn() {
    let dbref;
    const deferred = q.defer();
    const authMechanism = 'DEFAULT';
    const user = encodeURIComponent(_.get(config, 'db1.user'));
    const password = encodeURIComponent(_.get(config, 'db1.pw'));
    const authDb = encodeURIComponent(_.get(config, 'db1.dbName'));
    const url = `mongodb://${user}:${password}@localhost:27017/?authMechanism=${authMechanism}&authSource=${authDb}`;
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(function (err) {
        if (err) {
            throw err;
        }
        // console.log("Connected correctly to server and db " + authDb);
        dbref = client.db(authDb);
        deferred.resolve(dbref);
    });
    return deferred.promise;
}