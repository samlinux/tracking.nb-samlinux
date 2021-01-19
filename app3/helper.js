(function(){
  'use strict';
  const _ = require('lodash');

  /**
   * delivers the correct contract to the given identity
	 */ 	
	var getContract = function(connectionPool, identity, log){
    let contract = false;
    for(let i=0; i<connectionPool.length; i++){
      if(connectionPool[i].gateway.currentIdentity._name == identity){
        contract = connectionPool[i];
        break;
      }
    }
    if(_.has(contract,'gateway.currentIdentity._name')){
      log.info('Identity',contract.gateway.currentIdentity._name)
    }

    //console.log(Object.keys(connectionPool[0].gateway.currentIdentity)) 
    //console.log(connectionPool[0].gateway.currentIdentity._name)
    return contract;
	};
  
  /**
   * creates the compositeKey
   * @param {*} data 
   */
  var getKey = function(data){
    let rKey = _.get(data,'key',false);
    let aKey = rKey.split('~');

    let key = {};
    _.set(key,'fpoName',aKey[0]);
    _.set(key,'cropName',aKey[1]);
    _.set(key,'cropYear',aKey[2]);
    _.set(key,'cropId',aKey[3]);

    return key;
  }

  module.exports.getContract = getContract;
  module.exports.getKey = getKey;

})();