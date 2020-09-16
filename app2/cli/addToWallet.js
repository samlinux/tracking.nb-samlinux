/**
 * Hyperledger Fabric Node.js SDK REST API 
 * @rbole 
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { FileSystemWallet, X509WalletMixin } = require('fabric-network');
const wallet = new FileSystemWallet('../.wallet');
let appConfig = require('../.config.json');

// config
let user = appConfig.addToWalletUser;
let pkOfTheUser = appConfig.addToWalletUserPk;
let signcertOfTheUser = appConfig.addToWalletUseSignCert;
let mspId = appConfig.addToWalletUserMspId;

let config = {
  pathToUser:'/crypto-config/peerOrganizations/tracking.nb-samlinux.com/users/'+user,
  pathToUserSignCert: '/msp/signcerts/'+signcertOfTheUser,
  pathToUserPrivKey: '/msp/keystore/'+pkOfTheUser,
  identityLabel: user
}

async function main() {

  // Main try/catch block
  try {

    // Identity to credentials to be stored in the wallet
    const credPath = path.join('../../', config.pathToUser);
    const cert = fs.readFileSync(path.join(credPath, config.pathToUserSignCert)).toString();
    const key = fs.readFileSync(path.join(credPath, config.pathToUserPrivKey)).toString();

    // Load credentials into wallet
    const identityLabel = config.identityLabel;
    const identity = X509WalletMixin.createIdentity(mspId, cert, key);

    await wallet.import(identityLabel, identity);

  } catch (error) {
    console.log(`Error adding to wallet. ${error}`);
    console.log(error.stack);
  }
}

main().then(() => {
    console.log('done');
}).catch((e) => {
    console.log(e);
    console.log(e.stack);
    process.exit(-1);
});