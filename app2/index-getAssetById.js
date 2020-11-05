/**
 * Hyperledger Fabric REST API
 * @rbole 
 */

'use strict';
const _ = require('lodash');
const moment = require('moment');

module.exports = async function (req, connectionPool, helper, log) {
    
  // Get the key from the GET request and set it to lowercase, because of the chaincode.
  let queryKey = _.get(req,'body.data.key','1');

  try {
    
    /*
    Evaluate the specified transaction.
    Evaluate a transaction function and return its results. The transaction function name will be evaluated on the endorsing peers but the responses will not be sent to the ordering service and hence will not be committed to the ledger. This is used for querying the world state. 
    */
    let contract = helper.getContract(connectionPool,'User1@tracking.nb-samlinux.com', log);
    let result = await contract.evaluateTransaction('queryByKey',queryKey);

    // Construct the finale return object.
    let tmp = JSON.parse(result.toString());
    let r = {};
    if(_.has(tmp,'owner')){
      _.set(r,'key',queryKey);
    } 
    
    return r;
  } catch(err){
    //console.log('Failed to evaluate transaction:', err)
    let r = {key:false};
    return r; 
  }
}