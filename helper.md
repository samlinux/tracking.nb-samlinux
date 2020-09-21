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
CORE_PEER_ADDRESS=peer:7052 CORE_CHAINCODE_ID_NAME=mycc:0 ./tracking2_1
```

Open terminal 3.
```bash
docker exec -it cli bash
cd /opt/gopath/src
peer chaincode install -p chaincodedev/chaincode/tracking2_1 -n mycc -v 0
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
./enrollUser.sh van_delivery_company_a
./enrollUser.sh warehouse_a
./enrollUser.sh van_delivery_company_b
./enrollUser.sh van_delivery_company_c
./enrollUser.sh letter_box

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
export TLS_ORDERER_CA=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/nb-samlinux.com/tlsca/tlsca.nb-samlinux.com-cert.pem

# create channel
peer channel create -o orderer.nb-samlinux.com:7050 -c $CHANNEL_NAME -f ./channel-artifacts/channel_$CHANNEL_NAME.tx --tls --cafile $TLS_ORDERER_CA 

# join channel peer0
peer channel join -b $CHANNEL_NAME.block

export CORE_PEER_ADDRESS="peer1.tracking.nb-samlinux.com:8051"
peer channel join -b $CHANNEL_NAME.block
export CORE_PEER_ADDRESS="peer0.tracking.nb-samlinux.com:7051"

# install and instantiate chaincode on peer0
peer chaincode install -n trackingCC -v 1.0 -p github.com/chaincode/tracking/
peer chaincode instantiate -n trackingCC -v 1.0 -c '{"Args":[]}' -C tracking --tls --cafile $TLS_ORDERER_CA 

# install chaincode on peer1
export CORE_PEER_ADDRESS="peer1.tracking.nb-samlinux.com:8051"
peer chaincode install -n trackingCC -v 1.0 -p github.com/chaincode/tracking/
```

## Query and invoke some transactions
```bash
export CORE_PEER_ADDRESS="peer0.tracking.nb-samlinux.com:7051"
peer chaincode invoke -n trackingCC -c '{"Args":["set","1"]}' -C $CHANNEL_NAME --tls --cafile $TLS_ORDERER_CA

export CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/tracking.nb-samlinux.com/users/post_box/msp
peer chaincode invoke -n trackingCC -c '{"Args":["set","1"]}' -C $CHANNEL_NAME --tls --cafile $TLS_ORDERER_CA 

peer chaincode query -n trackingCC -c '{"Args":["history","1"]}' -C $CHANNEL_NAME | jq '.'
```

Extract and add ca.crt to the connection.json profile for peer0 and peer1
```bash
sed -E ':a;N;$!ba;s/\r{0,1}\n/\\n/g' crypto-config/peerOrganizations/tracking.nb-samlinux.com/peers/peer0.tracking.nb-samlinux.com/tls/ca.crt

sed -E ':a;N;$!ba;s/\r{0,1}\n/\\n/g' crypto-config/peerOrganizations/tracking.nb-samlinux.com/peers/peer1.tracking.nb-samlinux.com/tls/ca.crt
```

## Available identities app1

```bash
tree -L 1 app/.wallet/

app/.wallet/
├── User1@tracking.nb-samlinux.com
├── letter_box
├── post_box
├── post_office
├── van_delivery_company_a
├── van_delivery_company_b
├── van_delivery_company_c
└── warehouse_a
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

## The following API routes are available

- https://nb-tracking.samlinux.com/
- GET: https://nb-tracking.samlinux.com/api1
- GET: https://nb-tracking.samlinux.com/api1/getHistory/{packetID}
- POST https://nb-tracking.samlinux.com/api1/store with Payload 
  {"data": {
      "key": "3",
      "actor": "van_delivery_company_c"
    }
  }

## Monitoring - add operations service
Prometheus Server mit Grafana dashboard.

https://nb-tracking.samlinux.com/grafana/login


```bash
docker-compose -f docker-compose-monitor.yaml up -d
```
## Available identities app2

```bash
root@fabric02:~/fabric/tracking.nb-samlinux/app2# tree .wallet/
.wallet/
├── User1@tracking.nb-samlinux.com
├── aircraft_bay
├── aircraft_takeoff
├── export_docks
├── freight_forwarder_warehouse
├── loaded_in_trolley
├── loaded_into_aircraft
├── storage_location
└── truck
```

1. freight_forwarder_warehouse - Freight forwarder warehouse
2. truck - Truck
3. export_docks Export - docks
4. storage_location - Storage location
5. loaded_in_trolley - Loaded in trolley
6. aircraft_bay - Aircraft bay
7. loaded_into_aircraft - Loaded into aircraft
8. aircraft_takeoff - Aircarft takeoff

## Bunyan logs app2
```bash
pm2 logs --raw | /root/fabric/tracking.nb-samlinux/app2/node_modules/bunyan/bin/bunyan -o short
```

## Start scann simulation
```bash
cd cli
node scanSimulation.js [ProcessPreifx] [startNumber] [stepPerInterval] | | ../node_modules/bunyan/bin/bunyan

```