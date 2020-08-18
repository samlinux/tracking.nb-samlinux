#!/bin/bash

USER=$1

# register user
export FABRIC_CA_CLIENT_HOME=./crypto-config/peerOrganizations/tracking.nb-samlinux.com/ca/
fabric-ca-client register -d --id.name $USER --id.secret pw --id.type client -u http://0.0.0.0:7054

# enroll user
export FABRIC_CA_CLIENT_HOME=$PWD/crypto-config/peerOrganizations/tracking.nb-samlinux.com/users/$USER
fabric-ca-client enroll -u http://$USER:pw@0.0.0.0:7054 -M $FABRIC_CA_CLIENT_HOME/msp

cp config.yaml_template $FABRIC_CA_CLIENT_HOME/msp/config.yaml

tree -L 2 $PWD/crypto-config/peerOrganizations/tracking.nb-samlinux.com/users