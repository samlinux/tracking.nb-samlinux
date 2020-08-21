(function(){
  'use strict';
  const _ = require('lodash');
  /**
   * delivers the correct contract to the given identity
	 */ 	
	var getContract = function(connectionPool, identity){
    let contract = false;
    for(let i=0; i<connectionPool.length; i++){
      if(connectionPool[i].gateway.currentIdentity._name == identity){
        contract = connectionPool[i];
        break;
      }
    }
    if(_.has(contract,'gateway.currentIdentity._name')){
      console.log(contract.gateway.currentIdentity._name)
    }

    //console.log(Object.keys(connectionPool[0].gateway.currentIdentity)) 
    //console.log(connectionPool[0].gateway.currentIdentity._name)
    return contract;
	};
  
  module.exports.getContract = getContract;

})();