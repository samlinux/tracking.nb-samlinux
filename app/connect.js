/**
 * Hyperledger Fabric REST API
 * @rbole 
 */

'use strict';
module.exports =  function (config) {

  // We include to fabric requirements.
  const { FileSystemWallet, Gateway } = require('fabric-network');

  // We include the path to construct the connection profile.
  const path = require('path');

  // We create a promise.
  return new Promise (async (resolve, reject) => {
    // All available gateways
    let gatewayArray = [] ;

    // create a promise array to connect
    config.identities.forEach(identity => {
      gatewayArray.push(createGatewayBasedOnIdentity(identity));
    })
    
    Promise.all(gatewayArray).then(function(result){
      //console.log(Object.keys(result[0].gateway))
      //console.log(result[0].gateway.currentIdentity._name)
      resolve(result);
    })
  })

  /**
   * create a gateway to a contract for an identity
   * @param {*} identity string
   */
  function createGatewayBasedOnIdentity (identity){
   
    return new Promise (async (resolve, reject) => {
      try {
        // We construct the path to connection profile.
        const ccpPath = path.resolve(__dirname, config.ccpPath);
      
        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), config.walletPath);
        const wallet = new FileSystemWallet(walletPath);

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccpPath, { 
          wallet, 
          identity: identity, 
          discovery: { enabled: true, asLocalhost: true } });
        
        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork(config.channel);
      
        // Get the contract from the network.
        const contract = network.getContract(config.cc);
        resolve(contract);
      } catch(e){
        throw new Error(e);
      }
      
    })
  }
}