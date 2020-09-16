const Agenda = require('agenda');
const { MongoClient } = require("mongodb");
const q = require('q');

  let db1 = {
    user : 'app2',
    pw : 'Zi=sinx2BqJC9rbFHfXGg>3DZmJ9',
    dbName : 'app2'
  }

const user = encodeURIComponent(db1.user);
const password = encodeURIComponent(db1.pw);
const authMechanism = 'DEFAULT';

// Connection URL
const url = `mongodb://${user}:${password}@localhost:27017/?authMechanism=${authMechanism}&authSource=${db1.dbName}`;

// Create a new MongoClient
const client = new MongoClient(url, { useUnifiedTopology: true });

// global 
let transactions = [];

// Use connect method to connect to the Server
client.connect(function(err, client) {
  if(err){
    throw new Error(err);
  }
  console.log("Connected correctly to server");
  const db = client.db('app2');
  const agenda = new Agenda({mongo: db});

  agenda.define('get record', async job => {
    let docs = await processData(db);
    console.log('batch stored',docs)
  });

  (async function() { // IIFE to give access to async/await
    await agenda.start();
    // 5 seconds are the lowest number, because of the locktime
    await agenda.every('5 seconds', 'get record');
  })();

});

let processData = function(db){
  let deferred = q.defer();
  // get DB Data
  getData(db).then(function(result){
    
    return storeBlockchain(result);  
  }).then(function(result){
    deferred.resolve(result);
  })

  return deferred.promise;
}

//get DB Data
let getData = function(db){
  console.log('getData', new Date())
  let deferred = q.defer();
  let col = db.collection('colTracking2');
  col.find({},{}).toArray(function(err, docs) {
    if(err){
      throw new Error(err)
    }

    deferred.resolve(docs);
  });
  return deferred.promise;
}

let storeBlockchain = function(data){
  let deferred = q.defer();
  console.log('store blockchain');

  deferred.resolve(data);
  return deferred.promise;
}

