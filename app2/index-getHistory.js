/**
 * Hyperledger Fabric REST API
 * @rbole 
 */

'use strict';
const _ = require('lodash');
const moment = require('moment');

module.exports = async function (req, connectionPool, helper, log) {
    
  // Get the key from the GET request and set it to lowercase, because of the chaincode.
  let queryKey = req.params.key;

  try {
    
    /*
    Evaluate the specified transaction.
    Evaluate a transaction function and return its results. The transaction function name will be evaluated on the endorsing peers but the responses will not be sent to the ordering service and hence will not be committed to the ledger. This is used for querying the world state. 
    */
    let contract = helper.getContract(connectionPool,'User1@tracking.nb-samlinux.com', log);
    let result = await contract.evaluateTransaction('history',queryKey);

    // Construct the finale return object.
    let tmp = JSON.parse(result.toString());

    // Sorting scanned desc
    tmp = _.orderBy(tmp,['Packet.scanned'], ['desc']);
    _.forEach(tmp, (v,k) => {
      tmp[k].Packet.scanned = moment(new Date(v.Packet.scanned)).format("DD.MM.YYYY HH:mm:ss");
    })

    tmp = JSON.stringify(tmp);
    
    let r = {
      key: queryKey,
      value: tmp
    };
    return r;
  } catch(err){
    //console.log('Failed to evaluate transaction:', err)
    let r = {result:'Failed to evaluate transaction: '+err};
    return r; 
  }
}