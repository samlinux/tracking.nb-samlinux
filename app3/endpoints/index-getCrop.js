/**
 * Hyperledger Fabric REST API
 * @rbole 
 */

'use strict';
const _ = require('lodash');

module.exports = async function (req, connectionPool, helper, log, db) {

  let col = db.collection('barcode');

  // Get the keys and value from the POST request.
  let key = '';
  if(_.has(req,'body.data.barcode')){
    let barcode = _.get(req,'body.data.barcode','-1');
    barcode = parseInt(barcode);
    let search = {'barcode':barcode}
   
    let data = await col.find(search).next();
    key = helper.getKey({key:_.get(data,'compositeKey','-1')})
  } else {
    key = helper.getKey(_.get(req,'body.data',false))
  }
  
  let fpoName = _.get(key,'fpoName','');
  let cropName =_.get(key,'cropName','');
  let cropYear = _.get(key,'cropYear','');
  let cropId = _.get(key,'cropId','');

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
    let result = await contract.evaluateTransaction('getCrop', fpoName, cropName, cropYear, cropId);

    result = result.toString();
    result = JSON.parse(result);
    result = _.first(result);

    let r = {}
    if(_.isUndefined(result)){
      // Prepare the return value.
      r = {
        key: 'noKey'
      }
    } else {
      // Prepare the return value.
      r = {
        key: result.Key,
        value: result.Value
      }
    }
    
    return r;
    }
  }
  catch(error){
    let r = {r:'Failed to submit transaction: '+error};
    return r;
  }
}