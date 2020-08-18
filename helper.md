# Helper 

## Preparation
```bash
# first make sure you have an admin, if not enroll it
export FABRIC_CA_CLIENT_HOME=./crypto-config/peerOrganizations/tracking.nb-samlinux.com/ca/
fabric-ca-client enroll -d -u http://root:morgen@0.0.0.0:7054 

# register and enroll user identities
./enrollUser.sh post_office_hq-tracking.nb-samlinux.com
./enrollUser.sh post_post-tracking.nb-samlinux.com
./enrollUser.sh xxx

```

## Test
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

# query and invoke some transactions
peer chaincode query -n mycc -c '{"Args":["query","msg1"]}' -C $CHANNEL_NAME 
peer chaincode invoke -n mycc -c '{"Args":["set","msg2","sunshine.com"]}' -C $CHANNEL_NAME 

# test with another user
export CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/producer.sunshine.com/users/pos1-producer.sunshine.com/msp

```

docker logs ca.tracking.nb-samlinux.com 2>&1 
