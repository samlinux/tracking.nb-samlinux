# Add second project to the network
This project is for SATS air freight shipment.

- Create a new channel
- Create channel and join the peers
- Install and instantiate chaincode on channel tracking2


## Create the channel artifacts

```bash
# tell the configtxgen tool where to look for the configtx.yaml file
export FABRIC_CFG_PATH=$PWD

# the name of the channel
export CHANNEL_NAME=tracking2 

configtxgen -profile OneOrgsChannel -outputCreateChannelTx ./channel-artifacts/channel_$CHANNEL_NAME.tx -channelID $CHANNEL_NAME

tree ./channel-artifacts
```

## Create channel and join the peers

```bash
# Execute the cli container
docker exec -it cli bash

# these variables depends on the peer
export CHANNEL_NAME=tracking2 
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
export CORE_PEER_ADDRESS="peer0.tracking.nb-samlinux.com:7051"
peer chaincode install -n tracking2 -v 1  -p github.com/chaincode/tracking2 

# instantiate chaincode peer 0
peer chaincode instantiate -o orderer.nb-samlinux.com:7050 -C $CHANNEL_NAME -n tracking2  -v 1 -c '{"Args":[]}' --tls --cafile $TLS_ORDERER_CA 

# switch to peer1
export CORE_PEER_ADDRESS="peer1.tracking.nb-samlinux.com:8051"

# install chaincode peer1
peer chaincode install -n tracking2 -v 1  -p github.com/chaincode/tracking2  

# test the chaincode
peer chaincode invoke -n tracking2 -c '{"Args":["set","1","2020-09-09T23:00:00.000Z"]}' -C $CHANNEL_NAME --tls --cafile $TLS_ORDERER_CA 

peer chaincode query -n tracking2 -c '{"Args":["history","1"]}' -C $CHANNEL_NAME | jq '.'

```

## Needed identities

1. Freight forwarder warehouse
2. Truck
3. Export docks
4. Storage location
5. Loaded in trolley
6. Aircraft bay
7. Loaded into aircraft
8. Aircraft takeoff

### Enroll user identities from CA

```bash
# first make sure you have an admin, if not enroll it
cd /root/fabric/tracking.nb-samlinux
export FABRIC_CA_CLIENT_HOME=./crypto-config/peerOrganizations/tracking.nb-samlinux.com/ca/

# enroll the ca admin
fabric-ca-client enroll -d -u http://root:morgen@0.0.0.0:7054 

# register and enroll user identities
./enrollUser.sh freight_forwarder_warehouse
./enrollUser.sh truck
./enrollUser.sh export_docks
./enrollUser.sh storage_location
./enrollUser.sh loaded_in_trolley
./enrollUser.sh aircraft_bay
./enrollUser.sh loaded_into_aircraft
./enrollUser.sh aircraft_takeoff

tree ./crypto-config/peerOrganizations/tracking.nb-samlinux.com/users/
```

### Import identities into client wallet

```bash
tree crypto-config/peerOrganizations/tracking.nb-samlinux.com/users/freight_forwarder_warehouse/

modify .config.json

cd cli 
node addToWallet.js
```

## Upgrade chaincode process

```bash
# Execute the cli container
docker exec -it cli bash

# these variables depends on the peer
export CHANNEL_NAME=tracking2 
export CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/tracking.nb-samlinux.com/users/Admin@tracking.nb-samlinux.com/msp
export TLS_ORDERER_CA=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/nb-samlinux.com/tlsca/tlsca.nb-samlinux.com-cert.pem

peer chaincode install -n tracking2 -v 2.0 -p github.com/chaincode/tracking2-1

peer chaincode upgrade  -o orderer.nb-samlinux.com:7050 --tls --cafile $TLS_ORDERER_CA -C $CHANNEL_NAME -n tracking2 -v 2.0 -c '{"Args":[""]}'

# switch to peer1 and install the new chaincode
export CORE_PEER_ADDRESS="peer1.tracking.nb-samlinux.com:8051"
peer chaincode install -n tracking2 -v 2.0 -p github.com/chaincode/tracking2-1

peer chaincode query -n tracking2 -c '{"Args":["history","1"]}' -C $CHANNEL_NAME | jq '.'
peer chaincode query -n tracking2 -c '{"Args":["queryByKey","1"]}' -C $CHANNEL_NAME | jq '.'

# switch to peer0 and test again
export CORE_PEER_ADDRESS="peer0.tracking.nb-samlinux.com:7051"

```

