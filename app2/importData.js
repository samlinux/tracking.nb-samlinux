/**
  * © 2020- sdg - samlinux development group
  * Roland Bole
  */
 (function(){
	'use strict';
  const _ = require('lodash');

	let ImportData = function(config){
    this.Config = config;
    this.Transactions = [];
    this.Collection = 'colTracking2';
	};

	ImportData.prototype.init = function(){
		
		let deferred = this.Config.q.defer(), _this = this;

    this.connectToMongo().then(function(result){
      _this.fetchAndProcessData();
      deferred.resolve(true);
    })
		
		return deferred.promise;	
	};

  ImportData.prototype.connectToMongo = function(){
    let deferred = this.Config.q.defer(), _this = this;

    const user = encodeURIComponent(this.Config.config.db1.user);
    const password = encodeURIComponent(this.Config.config.db1.pw);
    const authMechanism = 'DEFAULT'

    // Connection URL
    const url = `mongodb://${user}:${password}@localhost:27017/?authMechanism=${authMechanism}&authSource=${this.Config.config.db1.dbName}`;

    // Create a new MongoClient
    const client = new this.Config.MongoClient(url, { useUnifiedTopology: true });

    // Use connect method to connect to the Server
    client.connect(function(err, client) {
      if(err){
        throw new Error(err);
      }
      _this.Config.log.info('Connected correctly to mongoDb @localhost');
      _this.Config.db = client.db('app2');
      deferred.resolve(true);
    });

    return deferred.promise;
  }

  ImportData.prototype.fetchAndProcessData = function(){
    // Intervall for dataimport
    let intervall = this.Config.config.importIntervall;
    this.Config.log.info('start fetchAndProcessData with intervall', intervall);
    let _this = this;

    const agenda = new this.Config.Agenda({mongo: this.Config.db});

    agenda.define('get record', async job => {
      // get scannes to import
      let batch = await _this.getData();

      // store in blockchain
      _this.storeInBlockchain(batch);
      if(batch.length > 0){
        _this.Config.log.info('-- batch stored',batch.length);
      }
      
      batch = [];
    });
  
    (async function() { // IIFE to give access to async/await
      await agenda.start();
      // 5 seconds are the lowest number, because of the locktime
      await agenda.every(intervall, 'get record');
    })();

  }

  /**
   * get all not imported records from the database
   * after fetching, these recordes are marked with imported
   */
  ImportData.prototype.getData = function(){
    this.Config.log.info('- start get batch data');
    let deferred = this.Config.q.defer(), _this = this;
    let col = this.Config.db.collection(this.Collection);
    let search = {imported:{$exists:false}};
    let fields = {};
    col.find(search, fields).toArray(function(err, docs){
      if(err){
        throw new Error(err)
      }
      
      let ids = [];
      _.forEach(docs, (doc) => {
        ids.push(doc._id);
      })
      _this.Config.log.info('-- scanned docs to import', docs.length);
      
      _this.markImportedData(ids).then(function(){  
        deferred.resolve(docs);
      })
    });
    return deferred.promise;
  }

  /**
   * mark all known scanns as imported
   */
  ImportData.prototype.markImportedData = function(ids){
    let deferred = this.Config.q.defer();
    let col = this.Config.db.collection(this.Collection);
    let importedDate = new Date(), _this = this;

    let search = {_id:{$in:ids}};
    let set = {$set:{imported:importedDate}};
    if(ids.length > 0){
      col.updateMany(search, set, function(err, r){
        if(err){
          throw new Error(err)
        }
        let log = `-- batch scanns ${ids} are marked as imported`;
        _this.Config.log.info(log);
       
        deferred.resolve(true);
      });
    } else {
      deferred.resolve(false);
    }
    
    return deferred.promise;
  };

  /**
   * send a transaction from every element in the batch to the blockchain
   * after the transaction is stored
   * update the mongodb record 
   * @param {*} batch 
   */
  ImportData.prototype.storeInBlockchain = async function(batch) {
    let batchJobs = [], _this = this;

    if(batch.length > 0){
      _.forEach(batch, (doc) => {
        let identity = _.get(doc,'identity','');
        let contract = this.Config.helper.getContract(this.Config.connectionPool, identity, this.Config.log);
        
        if(contract){
          let key = _.get(doc,'rfid','1');
          let scanned = _.get(doc,'scanned');
          _this.Config.log.info('--- ',key, scanned);
         
          batchJobs.push(contract.submitTransaction('set', key, scanned));
        }
      })
  
      let batchResult = await Promise.all(batchJobs);
      let keys = [];

      _.forEach(batchResult, (element) => {
        let result = element.toString();
        result = JSON.parse(result);
        
        if(_.get(result,'Key','') != ''){
          keys.push(_.get(result,'Key'))
        }
      })

      // upadate mongodb record
      let search = {rfid:{$in:keys}};
      let set = {$set:{storedInBlockchain:new Date()}};
      let col = _this.Config.db.collection(_this.Collection);
    
      col.updateMany(search, set, function(err, r){
        if(err){
          throw new Error(err)
        }
        _this.Config.log.info(`-- mongodb records ${keys} update`);
      });
    } 
  }

	module.exports.ImportData = ImportData;
})();


 
