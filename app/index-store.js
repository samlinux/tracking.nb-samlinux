/**
 * Hyperledger Fabric REST API
 * @rbole 
 */

'use strict';
const _ = require('lodash');

module.exports = async function (req, connectionPool, helper) {

  // Get the keys and value from the POST request.
  let key = _.get(req,'body.data.key','1');
  let identity = _.get(req,'body.data.actor','');
  let contract = helper.getContract(connectionPool, identity);
  
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
    let result = await contract.submitTransaction('set', key);

    result = result.toString();
    result = JSON.parse(result);
    
    // Prepare the return value.
    let r = {
      key: result.Key,
      txId: result.TxId
    }
    return r;
    }
  }
  catch(error){
    let r = {r:'Failed to submit transaction: '+error};
    return r;
  }
}