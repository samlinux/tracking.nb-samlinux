/*
 * Copyright 2020 by rbole@samlinux.at
 */

package main

import (
	"bytes"
	"crypto/x509"
	"encoding/json"
	"encoding/pem"
	"fmt"
	"strconv"
	"strings"
	"time"

	"github.com/hyperledger/fabric/core/chaincode/shim"
	"github.com/hyperledger/fabric/protos/peer"
)

// TrackingAsset implements a simple chaincode to manage an asset
type TrackingAsset struct {
}

type Packet struct {
	Owner string `json:"owner,omitempty"`
}

// main function starts up the chaincode in the container during instantiate
func main() {
	if err := shim.Start(new(TrackingAsset)); err != nil {
		fmt.Printf("Error starting TrackingAsset chaincode: %s", err)
	}
}

// Init is called during chaincode instantiation to initialize any
// data. Note that chaincode upgrade also calls this function to reset
// or to migrate data.
func (t *TrackingAsset) Init(stub shim.ChaincodeStubInterface) peer.Response {
	return shim.Success(nil)
}

// Invoke is called per transaction on the chaincode.
func (t *TrackingAsset) Invoke(stub shim.ChaincodeStubInterface) peer.Response {
	// Extract the function and args from the transaction proposal
	fn, args := stub.GetFunctionAndParameters()

	if fn == "set" {
		return t.storeTracking(stub, args)
	} else if fn == "history" {
		return t.getHistory(stub, args)
	}

	// if no case match an error will be thrown
	return shim.Error("Invalid invoke function name. Expecting \"set\" \"history\" ")
}

// Set stores the asset (both key and value) on the ledger.
// If the key exists, it will override the value with the new one
func (t *TrackingAsset) storeTracking(stub shim.ChaincodeStubInterface, args []string) peer.Response {
	var err error
	if len(args) != 1 {
		fmt.Println("Incorrect arguments. Expecting a key and a value")
	}

	// get TxId
	txId := stub.GetTxID()
	// get key
	key := args[0]

	fmt.Printf("Set Asset: %s, TxId:%s \n", key, txId)
	
	certificate, _ := stub.GetCreator()
	commonName := getIdentityCommonName(certificate)
	fmt.Printf("CommonName: %+s\n", commonName)

	// create the new packet object
	packet := &Packet{commonName}

	fmt.Printf("Packet: %+v\n", packet)
	packetJSONasBytes, err := json.Marshal(packet)
	if err != nil {
		fmt.Println("Failed to parse data")
	}

	err = stub.PutState(key, packetJSONasBytes)
	if err != nil {
		fmt.Printf("Failed to set asset: %s\n", key)
	} 

	return shim.Success(t.getKeyAsBytes(key, txId))
}

// getHistory get all transactions of a given packet ID
func (t *TrackingAsset) getHistory(stub shim.ChaincodeStubInterface, args []string) peer.Response {

	if len(args) < 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	packetId := args[0]

	fmt.Printf("- start getHistoryForPacket: %s\n", packetId)

	resultsIterator, err := stub.GetHistoryForKey(packetId)
	if err != nil {
		return shim.Error(err.Error())
	}
	defer resultsIterator.Close()

	// buffer is a JSON array containing historic values for the marble
	var buffer bytes.Buffer
	buffer.WriteString("[")

	bArrayMemberAlreadyWritten := false
	for resultsIterator.HasNext() {
		response, err := resultsIterator.Next()
		if err != nil {
			return shim.Error(err.Error())
		}
		// Add a comma before array members, suppress it for the first array member
		if bArrayMemberAlreadyWritten == true {
			buffer.WriteString(",")
		}
		buffer.WriteString("{\"TxId\":")
		buffer.WriteString("\"")
		buffer.WriteString(response.TxId)
		buffer.WriteString("\"")

		buffer.WriteString(", \"Packet\":")

		if response.IsDelete {
			buffer.WriteString("null")
		} else {
			buffer.WriteString(string(response.Value))
		}

		buffer.WriteString(", \"Timestamp\":")
		buffer.WriteString("\"")
		buffer.WriteString(time.Unix(response.Timestamp.Seconds, int64(response.Timestamp.Nanos)).String())
		buffer.WriteString("\"")

		buffer.WriteString(", \"IsDelete\":")
		buffer.WriteString("\"")
		buffer.WriteString(strconv.FormatBool(response.IsDelete))
		buffer.WriteString("\"")

		buffer.WriteString("}")
		bArrayMemberAlreadyWritten = true
	}
	buffer.WriteString("]")

	fmt.Printf("- getHistoryForPacket returning:\n%s\n", buffer.String())

	return shim.Success(buffer.Bytes())
}

// getIdentityCommonName extracts the CommonName from the
// transaction proposal certificate
func getIdentityCommonName(certificate []byte) string {
	data := certificate[strings.Index(string(certificate), "-----") : strings.LastIndex(string(certificate), "-----")+5]
	block, _ := pem.Decode([]byte(data))
	cert, _ := x509.ParseCertificate(block.Bytes)

	//fmt.Printf("%+v\n", cert.Subject.ToRDNSequence())
	//fmt.Printf("%s\n", cert.Subject.CommonName)
	//fmt.Printf("%s\n", cert.Subject.SerialNumber)

	// organization := cert.Issuer.Organization[0]
	// fmt.Printf("Org: %+v\n", organization)
	return cert.Subject.CommonName
}

// =========================================================
// getKeyAsBytes, is a helper function to give the asset key
// back after the inital storage of the asset
// ========================================================
func (t *TrackingAsset) getKeyAsBytes(key string, txId string) []byte {
	// we construct a new buffer for the output
	// we want finally a json object like {'Key':'uuid', 'TxId':'txId'}

	var buffer bytes.Buffer
	buffer.WriteString("{\"Key\":")
	buffer.WriteString("\"")
	buffer.WriteString(key)
	buffer.WriteString("\",")
	buffer.WriteString("\"TxId\":")
	buffer.WriteString("\"")
	buffer.WriteString(txId)
	buffer.WriteString("\"")
	buffer.WriteString("}")

	return buffer.Bytes()
}

