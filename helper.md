# Helper 

## Chaincode-dev-helper

Open Terminal 1.
```bash
docker-compose -f docker-compose-simple.yaml up
```

Open terminal 2.
```bash
docker exec -it chaincode bash
cd tracking
go build
CORE_PEER_ADDRESS=peer:7052 CORE_CHAINCODE_ID_NAME=mycc:0 ./tracking
```

Open terminal 3.
```bash
docker exec -it cli bash
cd /opt/gopath/src
peer chaincode install -p chaincodedev/chaincode/tracking -n mycc -v 0
peer chaincode instantiate -n mycc -v 0 -c '{"Args":[]}' -C myc

peer chaincode invoke -n mycc -c '{"Args":["set", "2"]}' -C myc
peer chaincode query -n mycc -c '{"Args":["history","1"]}' -C myc
```

## Network start preparation

Create crypto material.
```bash
init.sh
```

Start the network.
```bash
# fabric-ca adjustment get CA PK
ll crypto-config/peerOrganizations/tracking.nb-samlinux.com/ca/*_sk

# add fabric-ca PK to docker-compose file and start the network
docker-compose up -d
``` 

Enroll user identies.
```bash

# first make sure you have an admin, if not enroll it
cd /root/fabric/tracking.nb-samlinux
export FABRIC_CA_CLIENT_HOME=./crypto-config/peerOrganizations/tracking.nb-samlinux.com/ca/

# enroll the ca admin
fabric-ca-client enroll -d -u http://root:morgen@0.0.0.0:7054 

# register and enroll user identities
./enrollUser.sh post_office
./enrollUser.sh post_box

tree ./crypto-config/peerOrganizations/tracking.nb-samlinux.com/users/
```
## Logging
```bash
# do some logging if needed
docker logs ca.tracking.nb-samlinux.com 2>&1 
```

## Stop the network
Network is persistent.
```bash
docker-compose down
```

## Start the network
Network is persistent.
```bash
docker-compose up -d
```

## Clean up the network

```bash
docker-compose down
docker volume prune
docker rm $(docker ps -a -f status=exited -q)
```

## Create channel and install chaincode
```bash

# exec the cli container
docker exec -it cli bash

# set some environment vars
export CHANNEL_NAME=tracking 
export CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/tracking.nb-samlinux.com/users/Admin@tracking.nb-samlinux.com/msp

# create channel
peer channel create -o orderer.nb-samlinux.com:7050 -c $CHANNEL_NAME -f ./channel-artifacts/channel_$CHANNEL_NAME.tx

# join channel peer0
peer channel join -b $CHANNEL_NAME.block

export CORE_PEER_ADDRESS="peer1.tracking.nb-samlinux.com:8051"
peer channel join -b $CHANNEL_NAME.block
export CORE_PEER_ADDRESS="peer0.tracking.nb-samlinux.com:7051"

# install and instantiate chaincode on peer0
peer chaincode install -n trackingCC -v 1.0 -p github.com/chaincode/tracking/
peer chaincode instantiate -n trackingCC -v 1.0 -c '{"Args":[]}' -C tracking

# install chaincode on peer1
export CORE_PEER_ADDRESS="peer1.tracking.nb-samlinux.com:8051"
peer chaincode install -n trackingCC -v 1.0 -p github.com/chaincode/tracking/
```

## Query and invoke some transactions
```bash
export CORE_PEER_ADDRESS="peer0.tracking.nb-samlinux.com:7051"
peer chaincode invoke -n trackingCC -c '{"Args":["set","1"]}' -C $CHANNEL_NAME 

export CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/tracking.nb-samlinux.com/users/post_box/msp
peer chaincode invoke -n trackingCC -c '{"Args":["set","1"]}' -C $CHANNEL_NAME 

peer chaincode query -n trackingCC -c '{"Args":["history","1"]}' -C $CHANNEL_NAME | jq '.'

```

## Available user
```bash
tree -L 1 crypto-config/peerOrganizations/tracking.nb-samlinux.com/users/

crypto-config/peerOrganizations/tracking.nb-samlinux.com/users/
├── Admin@tracking.nb-samlinux.com
├── User1@tracking.nb-samlinux.com
├── post_box
└── post_office
```

## Start REST API
Make sure .config.json is ready to use. Fill in the right values. 
```bash
{
  "channel": "tracking",
  "cc":"trackingCC",
  "userName": "",
  "ccpPath": "./connection.json",
  "walletPath": ".wallet",
  "addToWalletUser": "",
  "addToWalletUserMspId": "TrackingMSP",
  "addToWalletUserPk": "",
  "addToWalletUseSignCert":""
}

```
The REST API is controlled by pm2. The application is publicly accessible through the following URLs.

- https://nb-tracking.samlinux.com/
- https://nb-tracking.samlinux.com/api1
- https://nb-tracking.samlinux.com/api1/getHistory/{packetID}



