/**
 * Hyperledger Fabric REST API
 * @rbole 
 */

'use strict';
const _ = require('lodash');

module.exports = async function (req, connectionPool, helper, log) {

  // Get the keys and value from the POST request.
  let key = helper.getKey(_.get(req,'body.data',false))
  
  let fpoName = _.get(key,'fpoName','');
  let cropName =_.get(key,'cropName','');
  let cropYear = _.get(key,'cropYear','');
  let cropId = _.get(key,'cropId','');

  let cropName2 = _.get(req,'body.data.cropName2','')
  let cropVarityName = _.get(req,'body.data.cropVarityName','')
  let purchasedFrom = _.get(req,'body.data.purchasedFrom','')
  let seedDate = _.get(req,'body.data.seedDate','')

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

    await contract.submitTransaction('setSeed', fpoName, cropName, cropYear, cropId, cropName2, cropVarityName, purchasedFrom, seedDate)

    // Prepare the return value.
    let r = {
      key: true
    }
    return r;
    }
  }
  catch(error){
    let r = {r:'Failed to submit transaction: '+error};
    return r;
  }
}