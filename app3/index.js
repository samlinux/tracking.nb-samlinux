/**
 * Fabric Application: Crop Tracing
 * @rbole 2021
 */

  // We include some requirement.
  const express = require('express');
  const bodyParser = require('body-parser'); 
  const cors = require('cors')
  const bunyan = require("bunyan");

  // We include our connection modul.
  const connectToContract = require('./connect'); 

  let config = require('./.config.json');
  let helper = require('./helper.js')

  let log = bunyan.createLogger({name: 'app3-logging'});

  // we include our API endpoint code.
  let getCrop = require('./endpoints/index-getCrop');
  let getCropByFpo = require('./endpoints/index-getCropByFpo');
  let getCropByFpoCrop = require('./endpoints/index-getCropByFpoCrop');

  let createCrop = require('./endpoints/index-createCrop');
  let setSeed = require('./endpoints/index-setSeed');
  let addFarmer = require('./endpoints/index-addFarmer');
  let addInputs = require('./endpoints/index-addInputs');

  // we do some logging
  let appLogging = function (req, res, next) {
    log.info('URL:',req.originalUrl);
    next()
  }

  // We create the express base instance.
  const app = express();
  // enable cors
  app.use(cors());
  // enable logging
  app.use(appLogging);
  // enable bodyParser because of the post requests
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
    res.json({msg:'hello, my name is Crop Tracing API'});
  })
  
  app.post('/getCrop', async function (req, res) {
    let result = await getCrop(req, connectionPool, helper, log)
    res.json(result);
  })

  app.post('/getCropByFpo', async function (req, res) {
    let result = await getCropByFpo(req, connectionPool, helper, log)
    res.json(result);
  })

  app.post('/getCropByFpoCrop', async function (req, res) {
    let result = await getCropByFpoCrop(req, connectionPool, helper, log)
    res.json(result);
  })
  
  app.post('/createCrop', async function (req, res) {
    let result = await createCrop(req, connectionPool, helper, log)
    res.json(result);
  })

  app.post('/setSeed', async function (req, res) {
    let result = await setSeed(req, connectionPool, helper, log)
    res.json(result);
  })

  app.post('/addFarmer', async function (req, res) {
    let result = await addFarmer(req, connectionPool, helper, log)
    res.json(result);
  })

  app.post('/addInputs', async function (req, res) {
    let result = await addInputs(req, connectionPool, helper, log)
    res.json(result);
  })

  // finally we start the api server
  app.listen(3030, function(){	
    log.info('- api server started listening on port 3030!');
  });	

})

