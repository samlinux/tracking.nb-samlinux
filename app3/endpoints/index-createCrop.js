/**
 * Hyperledger Fabric REST API
 * @rbole 
 */

'use strict';
const _ = require('lodash');

module.exports = async function (req, connectionPool, helper, log, db) {
  let col = db.collection('barcode');
  // Get the keys and value from the POST request.
  let fpoName = _.get(req,'body.data.fpoName','');
  let cropName = _.get(req,'body.data.cropName','');
  let cropDate = _.get(req,'body.data.cropDate','');
  let cropId = _.get(req,'body.data.cropId','');

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
    let result = await contract.submitTransaction('createCrop', fpoName, cropName, cropDate, cropId);

    result = result.toString();
    result = JSON.parse(result);

    // store barcode for compositeKey
    let newBarcode = await storeBarcode(result.Key, col);

    // Prepare the return value.
    let r = {
      key: result.Key,
      barcode: newBarcode
    }
   
    return r;
    }
  }
  catch(error){
    let r = {error:error};
    return r;
  }
}

let storeBarcode = async function(key, col){
  // get latest barcode and increment +1
  let search = {};
  let data = await col.find(search).sort({_id:-1}).limit(1).next();
  let lastBarcode = _.get(data,'barcode',false);
  let nextBarcode = lastBarcode + 1;

  let insert = {
    'barcode':nextBarcode,
    'compositeKey': key
  }
  await col.insertOne(insert)

  return nextBarcode;
}
