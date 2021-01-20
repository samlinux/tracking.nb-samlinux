const { get } = require('lodash');

(function(){
	'use strict';
	
	/**
	 * DB modul
	 * steuert die Zugriffe auf die MongoDB via mongo nativ driver
	 * @module sys/db
	 * @see module:sys/db
	 */

	//-----------------------------------
	// System module
	//-----------------------------------	 
		const MongoClient = require('mongodb').MongoClient;
		const ObjectId = require('mongodb').ObjectID;
    const q = require('q');
    const _ = require('lodash');

	//-----------------------------------
	// Modul Eigenschaften
	//-----------------------------------
		
		/** Referenz Object zum Config Object mit allen Datenbankinformationen */
		let Config = {};

		/** Config Array mit allen Datenbankinformationen, pro Datenbank ein Object im Array */
		let	ConfigDb = {};

		/** Alle vorhandenen authentifizierten DB Referenzen  */
		let DbConns = [];

		/** DB Referenz der gewünschten Datenbank */
    let DbReference = {};
    
    let Logging = {};

	/**
	 * Verwaltet die Datenbank Referenzen und steuert den Zugriff auf die Datenbank
	 */
	let DB = {
		init: function(config, log){
      Logging = log;
			let deferred = q.defer();
      Config = config;
			ConfigDb = _.get(Config,'db1')

      this.connectToServer(_.get(ConfigDb,'user'),_.get(ConfigDb,'pw'),_.get(ConfigDb,'dbName')).then(function(){
        Logging.info('Auth against all databases ready');
        deferred.resolve(true);
      })
      
			return deferred.promise;
		},
		/** Verbindung zum MonogDB Server wird aufgebaut */
		connectToServer: function(_user, _password, _authDb){
      let deferred = q.defer();
      let authMechanism = 'DEFAULT';
      let user = encodeURIComponent(_user);
      let password = encodeURIComponent(_password);
      let authDb = encodeURIComponent(_authDb);
      let url = `mongodb://${user}:${password}@localhost:27017/?authMechanism=${authMechanism}&authSource=${authDb}`;

      let client = new MongoClient(url,{ useNewUrlParser: true,  useUnifiedTopology: true });

      client.connect(function(err) {
          if(err){
              throw err;
          }
          Logging.info("Connected correctly to server and db "+authDb);
          let dbref = client.db(authDb);
          DbConns[authDb] = dbref;	
          
          deferred.resolve(true);
      });
            
			return deferred.promise; 	
		},
		/** wechselt die Datenbank und gibt die aktuelle Referenz zurück */
		getDatabase: function(dbName){
			DbReference = DbConns[dbName];
			return DbReference;
		},
		/** gibt eine aktuelle mongoDb ObjectId zurück */
		getObjectId: function(){
			return ObjectId;
		},
		/** für debug // gibt alle aktuellen DB Referenzen retour */
		getConns: function(){
			return DbConns;
		}
	};
	
	module.exports = DB;
})();
