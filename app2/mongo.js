(function(){
	'use strict';

	/**
	 * DB modul
	 * steuert die Zugriffe auf die MongoDB via mongo nativ driver
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
		let	ConfigDb = [];

		/** Alle vorhandenen authentifizierten DB Referenzen  */
		let DbConns = [];

		/** DB Referenz der gewünschten Datenbank */
		let DbReference = {};

	/**
	 * Verwaltet die Datenbank Referenzen und steuert den Zugriff auf die Datenbank
	 */
	let DB = {
		init: function(config){
      let deferred = q.defer();
			Config = config;
		
      let dbs = [];
      _.forEach(Config, (db) => {
        dbs.push(this.connectToServer(_.get(db,'user'),_.get(db,'pwd'),_.get(db,'name')))
      })

      q.all(dbs).done(function(){
          //console.log('Auth against all databases ready');
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

    let client = new MongoClient(url,{ useNewUrlParser: true, useUnifiedTopology: true });

    client.connect(function(err) {
        if(err){
            throw err;
        }
        //console.log("Connected correctly to server and db "+authDb);
        let dbref = client.db(authDb);
        DbConns[authDb] = dbref;

        //const col = dbref.collection('colKontakte');
        //console.log(dbref)
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
