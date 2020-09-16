/**
 * Hyperledger Fabric Node.js SDK REST API 
 * @rbole 
 */

// ----------------------------------------
// requirements
// ---------------------------------------- 

  // We include some requirement.
  const express = require('express');
  const bodyParser = require('body-parser'); 
  const cors = require('cors')
  const q = require('q');
  const Agenda = require('agenda');
  const { MongoClient } = require("mongodb");
  const bunyan = require("bunyan");
  let log = bunyan.createLogger({name: 'app2-logging'});

  // we include our API endpoint code.
  let getHistory = require('./index-getHistory');
  let importData = require('./importData').ImportData;

  // We include our connection modul.
  let connectToContract = require('./connect'); 

  // We include our config file.
  let config = require('./.config.json');
  let helper = require('./helper.js')

// ----------------------------------------
// express.js 
// ----------------------------------------

  // We create the express base instance.
  const app = express();
  // enable cors
  app.use(cors())

  // We include the bodyParser because of the post requests.
  app.use(bodyParser.json());      
  app.use(bodyParser.urlencoded({ 
    extended: true
  }));  

  // On start we connect to the gateway.
  connectToContract(config).then(function(connectionPool){
    
    // Connection is established we are ready to start the API server.
    // We set the global gateway pointer to disconnect the connect on interruption.
   
    console.log('- connection to fabric network ready for:')
    connectionPool.forEach(connection => {
      console.log('-- '+connection.gateway.currentIdentity._name)  
    })

    // -------------------------------------------
    // We implement the api endpoints.
    // All results are formatted as json strings.
    // -------------------------------------------
    
    // We check if API is running.
    app.get('/', function (req, res) {
      res.json({msg:'hello nb-tracking.samlinux.com api'});
    })
    
    // We store a new or update an existing asset
    // @postParam {json object} {data:{key:'', actor:''}}
    /*
    app.post('/store', async function (req, res) {
      let result = await store(req, connectionPool, helper)
      res.json(result);
    })
    */
    // We want all versions of an asset
    // @apiParam {json object} key 
    app.get('/getHistory/:key', async function (req, res) {
      let result = await getHistory(req, connectionPool, helper, log)
      res.json(result);
    })

    // finally we start the api server
    app.listen(3020, function(){	
      console.log('- api server started listening on port 3020!');



      // start data fetching
      let _config = {
        q:q,
        Agenda: Agenda,
        MongoClient: MongoClient,
        db: {},
        helper: helper,
        connectionPool: connectionPool,
        log: log,
        config: config

      }
      
      let ImportData = new importData(_config);
      ImportData.init();

    });	
  })

// ----------------------------------------
// we disconnect from the gateway CTRL + c
// ----------------------------------------
process.on('SIGINT', async function  () {
  console.log("Caught interrupt signal -  start disconnect from the gateway");
    process.exit();
});