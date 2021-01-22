/**
 * Hyperledger Fabric REST API
 * @rbole 
 */

'use strict';
const _ = require('lodash');

module.exports = async function (req, connectionPool, helper, log) {

  // Get the keys and value from the POST request.
  let fpoName = _.get(req,'body.data.fpoName','')
  fpoName = fpoName.toLowerCase();

  let cropName = _.get(req,'body.data.cropName','')
  cropName = cropName.toLowerCase();
  
  let identity = 'croptracing';
  let contract = helper.getContract(connectionPool, identity, log);
  
  try {
    if(!contract){
      let r = {
        err: 'no valid contract'
      }
      return r;
    } else {
     /* 
     Submit the specified transaction.
     Submit a transaction to the ledger. The transaction function name will be evaluated on the endorsing peers and then submitted to the ordering service for committing to the ledger. 
     */
    let result = await contract.evaluateTransaction('getCropByFpoCrop', fpoName, cropName);

    result = result.toString();
    result = JSON.parse(result);

    let r = {}
    if(_.isUndefined(result)){
      // Prepare the return value.
      r = {
        key: 'noKey'
      }
    } else {
      // Prepare the return value.
      r = result
    }
    
    return r;
    }
  }
  catch(error){
    let r = {r:'Failed to submit transaction: '+error};
    return r;
  }
}