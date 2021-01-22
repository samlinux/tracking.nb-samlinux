# Fabric Application: Crop Tracing

## Chaincode Preparation
```bash
# copy the chaincode to chaincode/croptracing
cp ...

# add dependencies
cd chaincode/croptracing
go mod init croptracing
G111MODULE=on go mod vendor
```

## Create the channel artifacts

```bash
# tell the configtxgen tool where to look for the configtx.yaml file
export FABRIC_CFG_PATH=$PWD

# the name of the channel
export CHANNEL_NAME=croptracing-dev 
export SYS_CHANNEL_NAME=sunshine-sys-channel 

configtxgen -profile OneOrgsChannel -outputCreateChannelTx ./channel-artifacts/channel_$CHANNEL_NAME.tx -channelID $CHANNEL_NAME

tree ./channel-artifacts
```

## Create channel and join the peers

```bash
# Execute the cli container
docker exec -it cli bash

# these variables depends on the peer
export CHANNEL_NAME=croptracing-dev 
export CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/tracking.nb-samlinux.com/users/Admin@tracking.nb-samlinux.com/msp
export TLS_ORDERER_CA=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/nb-samlinux.com/tlsca/tlsca.nb-samlinux.com-cert.pem

# create channel
peer channel create -o orderer.nb-samlinux.com:7050 -c $CHANNEL_NAME -f ./channel-artifacts/channel_$CHANNEL_NAME.tx --tls --cafile $TLS_ORDERER_CA 

# join channel peer0
peer channel join -b $CHANNEL_NAME.block  

export CORE_PEER_ADDRESS="peer1.tracking.nb-samlinux.com:8051"
peer channel join -b $CHANNEL_NAME.block
export CORE_PEER_ADDRESS="peer0.tracking.nb-samlinux.com:7051"

peer channel list
```

## Install and instantiate chaincode on second channel
```bash
# install chaincode peer0
export CORE_PEER_ADDRESS="peer0.producer.sunshine.com:7051"
peer chaincode install -n croptracing -v 1  -p github.com/chaincode/croptracing 

# instantiate chaincode peer 0
peer chaincode instantiate -o orderer.nb-samlinux.com:7050 -C $CHANNEL_NAME -n croptracing  -v 1 -c '{"Args":[]}' --tls --cafile $TLS_ORDERER_CA 

# switch to peer1
export CORE_PEER_ADDRESS="peer1.tracking.nb-samlinux.com:8051"

# install chaincode peer1
peer chaincode install -n croptracing -v 1  -p github.com/chaincode/croptracing  

peer chaincode invoke -n croptracing -c '{"Args":["createCrop","fpo1","Banana","2021-01-16T16:33:00.000Z","1"]}' -C $CHANNEL_NAME --tls --cafile $TLS_ORDERER_CA 

peer chaincode query -n croptracing -c '{"Args":["getCrop","fpo1","Banana","2021","1"]}' -C $CHANNEL_NAME | jq '.'

```
## Needed identities

1. croptracing

### Enroll user identities from CA

```bash
# first make sure you have an admin, if not enroll it
cd /root/fabric/tracking.nb-samlinux
export FABRIC_CA_CLIENT_HOME=./crypto-config/peerOrganizations/tracking.nb-samlinux.com/ca/

# enroll the ca admin
fabric-ca-client enroll -d -u http://root:morgen@0.0.0.0:7054 

# register and enroll user identities
./enrollUser.sh croptracing

tree ./crypto-config/peerOrganizations/tracking.nb-samlinux.com/users/
```

### Import identities into client wallet

```bash
tree crypto-config/peerOrganizations/tracking.nb-samlinux.com/users/croptracing

modify .config.json

cd cli 
node addToWallet.js
```

## Barcode mapping Database
```bash
# create database
use app3
db.createUser({user:'app3',pwd:'',roles:[{role:'readWrite',db:'app3'}]})

# create collection
db.createCollection("barcode")
```

## Log the application
```bash

pm2 logs croptracing

pm2 logs croptracing --raw | /root/fabric/tracking.nb-samlinux/app2/node_modules/bunyan/bin/bunyan -o short
```

