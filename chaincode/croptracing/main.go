/*
 * Copyright IBM Corp All Rights Reserved
 *
 * SPDX-License-Identifier: Apache-2.0
 */

 package main

 import (
	 "bytes"
	 "encoding/json"
	 "errors"
	 "fmt"
	 "strconv"
	 "strings"
	 "time"
 
	 "github.com/hyperledger/fabric-chaincode-go/shim"
	 "github.com/hyperledger/fabric-protos-go/peer"
 )
 
 // SimpleAsset implements a simple chaincode to manage an asset
 type SimpleAsset struct {
 }
 
 // Crop implements the main object
 type Crop struct {
	 CropName string
	 FpoName  string
	 CropDate time.Time
	 Farmer   []Farmer
	 Seed     Seed
	 Inputs   []Inputs
 }
 
 // Farmer implements a subobject
 type Farmer struct {
	 Name    string
	 Address string
 }
 
 // Seed implements a subobject
 type Seed struct {
	 CropName       string
	 CropVarityName string
	 PurchasedFrom  string
	 SeedDate       time.Time
 }
 
 // Inputs implements a subobject
 type Inputs struct {
	 Name          string
	 Type          string
	 PurchasedFrom string
	 InputDate     time.Time
 }
 
 // CreateResult implements a return object
 type CreateResult struct {
	 Key string
 }
 
 // main function starts up the chaincode in the container during instantiate
 func main() {
	 if err := shim.Start(new(SimpleAsset)); err != nil {
		 fmt.Printf("Error starting SimpleAsset chaincode: %s", err)
	 }
 }
 
 // Init is called during chaincode instantiation to initialize any
 // data. Note that chaincode upgrade also calls this function to reset
 // or to migrate data.
 func (t *SimpleAsset) Init(stub shim.ChaincodeStubInterface) peer.Response {
	 return shim.Success(nil)
 }
 
 // Invoke is called per transaction on the chaincode. Each transaction is
 // either a 'get' or a 'set' on the asset created by Init function. The Set
 // method may create a new asset by specifying a new key-value pair.
 func (t *SimpleAsset) Invoke(stub shim.ChaincodeStubInterface) peer.Response {
	 // Extract the function and args from the transaction proposal
	 fn, args := stub.GetFunctionAndParameters()
	 fmt.Println("function call " + fn)
 
	 if fn == "createCrop" {
		 return t.createCrop(stub, args)
	 } else if fn == "getCrop" {
		 return t.getCrop(stub, args)
	 } else if fn == "getCropByFpo" {
		 return t.getCropByFpo(stub, args)
	 } else if fn == "getCropByFpoCrop" {
		 return t.getCropByFpoCrop(stub, args)
	 } else if fn == "getCropByFpoCropYear" {
		 return t.getCropByFpoCropYear(stub, args)
	 } else if fn == "addFarmer" {
		 return t.addFarmer(stub, args)
	 } else if fn == "setSeed" {
		 return t.setSeed(stub, args)
	 } else if fn == "addInputs" {
		 return t.addInputs(stub, args)
	 }
 
	 fmt.Println("Invoke did not find func: " + fn) //error
	 return shim.Error("Received unknown function invocation")
 }
 
 // create a new crop asset
 func (t *SimpleAsset) createCrop(stub shim.ChaincodeStubInterface, args []string) peer.Response {
	 if len(args) != 4 {
		 return shim.Error("Incorrect arguments to create a crop.")
	 }
 
	 // parse the string time to golang time - scanned date time
	 layout := "2006-01-02T15:04:05.000Z"
	 str := args[2]
	 cropDate, err := time.Parse(layout, str)
 
	 // create compositeKey
	 indexFpo := strings.ToLower(args[0])
	 indexFpo = strings.ReplaceAll(indexFpo, " ", "_")
 
	 indexCrop := strings.ToLower(args[1])
	 indexCrop = strings.ReplaceAll(indexCrop, " ", "_")
 
	 var indexYear int
	 indexYear = cropDate.Year()
	 indexYearString := strconv.Itoa(indexYear)
	 indexID := args[3]
 
	 indexName := "fpo~crop~year~id"
	 indexValue := []string{indexFpo, indexCrop, indexYearString, indexID}
	 indexKey, err := stub.CreateCompositeKey(indexName, indexValue)
 
	 // check if crop aka compositeKey exists
	 config := []string{indexFpo, indexCrop, indexYearString, indexID}
	 tempCrop, err := getOldData(stub, config)
 
	 if err == nil {
		 return shim.Error(fmt.Sprintf("Crop %v exists ", tempCrop.CropName))
	 }
 
	 var crop Crop
	 crop.FpoName = args[0]
	 crop.CropName = args[1]
	 crop.CropDate = cropDate
 
	 cropJSONasBytes, err := json.Marshal(crop)
 
	 stub.PutState(indexKey, cropJSONasBytes)
 
	 if err != nil {
		 msg := fmt.Sprintf("Error starting SimpleAsset chaincode: %s", err)
		 return shim.Error(msg)
	 }
 
	 var createResult CreateResult
	 indexString := strings.Join(indexValue, "~")
	 createResult.Key = indexString
 
	 resultJSONasBytes, err := json.Marshal(createResult)
	 if err != nil {
		 return shim.Error(err.Error())
	 }
	 fmt.Println("- end createCrop (success)")
	 return shim.Success(resultJSONasBytes)
 }
 
 func (t *SimpleAsset) getCrop(stub shim.ChaincodeStubInterface, args []string) peer.Response {
	 var err error
 
	 if len(args) != 4 {
		 return shim.Error("Incorrect number of arguments. Expecting name of the marble to query")
	 }
 
	 // create the compositeKey
	 indexFpo := strings.ToLower(args[0])
	 indexCrop := strings.ToLower(args[1])
	 indexYear := strings.ToLower(args[2])
	 indexID := strings.ToLower(args[3])
 
	 resultsIterator, deltaErr := stub.GetStateByPartialCompositeKey("fpo~crop~year~id", []string{indexFpo, indexCrop, indexYear, indexID})
 
	 // if no data available
	 if deltaErr != nil {
		 return shim.Error(fmt.Sprintf("Could not retrieve value %s", deltaErr.Error()))
	 }
	 defer resultsIterator.Close()
 
	 // read the data
	 buffer, err := constructQueryResponseFromIterator(resultsIterator, stub)
	 if err != nil {
		 return shim.Error(err.Error())
	 }
	 // return the data
	 return shim.Success(buffer.Bytes())
 }
 
 func (t *SimpleAsset) getCropByFpo(stub shim.ChaincodeStubInterface, args []string) peer.Response {
 
	 if len(args) != 1 {
		 return shim.Error("Incorrect number of arguments. Expecting name of the getCropByFpo to query")
	 }
 
	 name := args[0]
	 // Get all deltas for the variable
	 resultsIterator, deltaErr := stub.GetStateByPartialCompositeKey("fpo~crop~year~id", []string{name})
	 if deltaErr != nil {
		 return shim.Error(fmt.Sprintf("Could not retrieve value for %s: %s", name, deltaErr.Error()))
	 }
	 defer resultsIterator.Close()
 
	 // Check the variable existed
	 if !resultsIterator.HasNext() {
		 return shim.Error(fmt.Sprintf("No records for the key %s exists", name))
	 }
 
	 buffer, err := constructQueryResponseFromIterator(resultsIterator, stub)
	 if err != nil {
		 return shim.Error(err.Error())
	 }
	 return shim.Success(buffer.Bytes())
 }
 
 func (t *SimpleAsset) getCropByFpoCrop(stub shim.ChaincodeStubInterface, args []string) peer.Response {
 
	 if len(args) != 2 {
		 return shim.Error("Incorrect number of arguments. Expecting name of the marble to query")
	 }
 
	 fpoName := args[0]
	 cropName := args[1]
	 // Get all deltas for the variable
	 resultsIterator, deltaErr := stub.GetStateByPartialCompositeKey("fpo~crop~year~id", []string{fpoName, cropName})
	 if deltaErr != nil {
		 return shim.Error(fmt.Sprintf("Could not retrieve value for %s", deltaErr.Error()))
	 }
	 defer resultsIterator.Close()
 
	 // Check the variable existed
	 if !resultsIterator.HasNext() {
		 return shim.Error(fmt.Sprintf("No records for the key %s %s exists", fpoName, cropName))
	 }
 
	 buffer, err := constructQueryResponseFromIterator(resultsIterator, stub)
	 if err != nil {
		 return shim.Error(err.Error())
	 }
	 return shim.Success(buffer.Bytes())
 }
 
 func (t *SimpleAsset) getCropByFpoCropYear(stub shim.ChaincodeStubInterface, args []string) peer.Response {
 
	 if len(args) != 3 {
		 return shim.Error("Incorrect number of arguments. Expecting name of the marble to query")
	 }
 
	 fpoName := args[0]
	 cropName := args[1]
	 cropYear := args[2]
	 // Get all deltas for the variable
	 resultsIterator, deltaErr := stub.GetStateByPartialCompositeKey("fpo~crop~year~id", []string{fpoName, cropName, cropYear})
	 if deltaErr != nil {
		 return shim.Error(fmt.Sprintf("Could not retrieve value for %s", deltaErr.Error()))
	 }
	 defer resultsIterator.Close()
 
	 // Check the variable existed
	 if !resultsIterator.HasNext() {
		 return shim.Error(fmt.Sprintf("No records for the key %s %s exists", fpoName, cropName))
	 }
 
	 buffer, err := constructQueryResponseFromIterator(resultsIterator, stub)
	 if err != nil {
		 return shim.Error(err.Error())
	 }
	 return shim.Success(buffer.Bytes())
 }
 
 func (t *SimpleAsset) addFarmer(stub shim.ChaincodeStubInterface, args []string) peer.Response {
	 var err error
 
	 if len(args) != 6 {
		 return shim.Error("Incorrect number of arguments.")
	 }
 
	 indexFpo := strings.ToLower(args[0])
	 indexCrop := strings.ToLower(args[1])
	 indexYear := strings.ToLower(args[2])
	 indexID := strings.ToLower(args[3])
	 indexName := "fpo~crop~year~id"
 
	 // check if crop exists
	 config := []string{indexFpo, indexCrop, indexYear, indexID}
	 tempCrop, err2 := getOldData(stub, config)
 
	 if err2 != nil {
		 return shim.Error(fmt.Sprintf("Crop: %v~%v~%v~%v does not exists. ", indexFpo, indexCrop, indexYear, indexID))
	 }
 
	 var farmer Farmer
	 farmer.Name = args[4]
	 farmer.Address = args[5]
	 tempCrop.Farmer = append(tempCrop.Farmer, farmer)
 
	 indexValue := []string{indexFpo, indexCrop, indexYear, indexID}
	 indexKey, err := stub.CreateCompositeKey(indexName, indexValue)
 
	 farmerJSONasBytes, _ := json.Marshal(tempCrop)
	 //rewrite the crop
	 err = stub.PutState(indexKey, farmerJSONasBytes)
	 if err != nil {
		 return shim.Error(err.Error())
	 }
 
	 fmt.Println("- end addFarmer (success)")
	 return shim.Success(nil)
 }
 
 func (t *SimpleAsset) setSeed(stub shim.ChaincodeStubInterface, args []string) peer.Response {
	 var err error
 
	 if len(args) != 8 {
		 return shim.Error("Incorrect number of arguments.")
	 }
 
	 indexFpo := strings.ToLower(args[0])
	 indexCrop := strings.ToLower(args[1])
	 indexYear := strings.ToLower(args[2])
	 indexID := strings.ToLower(args[3])
	 indexName := "fpo~crop~year~id"
 
	 config := []string{indexFpo, indexCrop, indexYear, indexID}
	 tempCrop, err2 := getOldData(stub, config)
 
	 if err2 != nil {
		 return shim.Error(fmt.Sprintf("Crop: %v~%v~%v~%v does not exists. ", indexFpo, indexCrop, indexYear, indexID))
	 }
 
	 // NEW DATA
	 var seed Seed
	 seed.CropName = args[4]
	 seed.CropVarityName = args[5]
	 seed.PurchasedFrom = args[6]
 
	 // parse the string time to golang time - scanned date time
	 layout := "2006-01-02T15:04:05.000Z"
	 str := args[7]
	 seedDate, err := time.Parse(layout, str)
	 seed.SeedDate = seedDate
 
	 tempCrop.Seed = seed
 
	 indexValue := []string{indexFpo, indexCrop, indexYear, indexID}
	 indexKey, err := stub.CreateCompositeKey(indexName, indexValue)
 
	 tempCropJSONasBytes, _ := json.Marshal(tempCrop)
	 //rewrite the crop
	 err = stub.PutState(indexKey, tempCropJSONasBytes)
	 if err != nil {
		 return shim.Error(err.Error())
	 }
 
	 fmt.Println("- end set seed (success)")
	 return shim.Success(nil)
 }
 
 func (t *SimpleAsset) addInputs(stub shim.ChaincodeStubInterface, args []string) peer.Response {
	 var err error
 
	 if len(args) != 8 {
		 return shim.Error("Incorrect number of arguments.")
	 }
 
	 indexFpo := strings.ToLower(args[0])
	 indexCrop := strings.ToLower(args[1])
	 indexYear := strings.ToLower(args[2])
	 indexID := strings.ToLower(args[3])
	 indexName := "fpo~crop~year~id"
 
	 config := []string{indexFpo, indexCrop, indexYear, indexID}
	 tempCrop, err2 := getOldData(stub, config)
 
	 if err2 != nil {
		 return shim.Error(fmt.Sprintf("Crop: %v~%v~%v~%v does not exists. ", indexFpo, indexCrop, indexYear, indexID))
	 }
 
	 var inputs Inputs
	 inputs.Name = args[4]
	 inputs.Type = args[5]
	 inputs.PurchasedFrom = args[6]
 
	 // parse the string time to golang time - scanned date time
	 layout := "2006-01-02T15:04:05.000Z"
	 str := args[7]
	 inputDate, err := time.Parse(layout, str)
	 inputs.InputDate = inputDate
 
	 tempCrop.Inputs = append(tempCrop.Inputs, inputs)
 
	 indexValue := []string{indexFpo, indexCrop, indexYear, indexID}
	 indexKey, err := stub.CreateCompositeKey(indexName, indexValue)
 
	 tmpJSONasBytes, _ := json.Marshal(tempCrop)
	 //rewrite the crop
	 err = stub.PutState(indexKey, tmpJSONasBytes)
	 if err != nil {
		 return shim.Error(err.Error())
	 }
 
	 fmt.Println("- end addInputs (success)")
	 return shim.Success(nil)
 }
 
 func constructQueryResponseFromIterator(resultsIterator shim.StateQueryIteratorInterface, stub shim.ChaincodeStubInterface) (*bytes.Buffer, error) {
	 // buffer is a JSON array containing historic values for the marble
	 var buffer bytes.Buffer
	 buffer.WriteString("[")
 
	 bArrayMemberAlreadyWritten := false
	 for resultsIterator.HasNext() {
		 response, err := resultsIterator.Next()
		 if err != nil {
			 return nil, err
		 }
 
		 _, keyParts, splitKeyErr := stub.SplitCompositeKey(response.Key)
		 if splitKeyErr != nil {
			 return nil, err
		 }
 
		 // Retrieve the delta value and operation
 
		 indexFpo := keyParts[0]
		 indexCrop := keyParts[1]
		 indexYear := keyParts[2]
		 indexID := keyParts[3]
 
		 // Add a comma before array members, suppress it for the first array member
		 if bArrayMemberAlreadyWritten == true {
			 buffer.WriteString(",")
		 }
 
		 buffer.WriteString("{\"Key\":")
		 buffer.WriteString("\"")
		 indexString := fmt.Sprintf("%s~%s~%s~%s", indexFpo, indexCrop, indexYear, indexID)
 
		 buffer.WriteString(indexString)
		 buffer.WriteString("\"")
 
		 buffer.WriteString(", \"Value\":")
		 buffer.WriteString(string(response.Value))
		 buffer.WriteString("}")
		 bArrayMemberAlreadyWritten = true
	 }
	 buffer.WriteString("]")
 
	 return &buffer, nil
 }
 
 // GetOldData delivers the old DataModel
 func getOldData(stub shim.ChaincodeStubInterface, args []string) (Crop, error) {
	 var tempCrop Crop
 
	 if len(args) != 4 {
		 fmt.Println("Incorrect number of arguments.")
	 }
 
	 // create the composite key
	 indexFpo := strings.ToLower(args[0])
	 indexCrop := strings.ToLower(args[1])
	 indexYear := strings.ToLower(args[2])
	 indexID := strings.ToLower(args[3])
	 indexName := "fpo~crop~year~id"
 
	 // get the data
	 resultsIterator, _ := stub.GetStateByPartialCompositeKey(indexName, []string{indexFpo, indexCrop, indexYear, indexID})
 
	 defer resultsIterator.Close()
 
	 if !resultsIterator.HasNext() {
		 return tempCrop, errors.New("noRecordExists")
	 }
 
	 // get the first record
	 response, _ := resultsIterator.Next()
 
	 err2 := json.Unmarshal(response.Value, &tempCrop)
	 if err2 != nil {
		 return tempCrop, errors.New(err2.Error())
	 }
	 //fmt.Println(fmt.Sprintf("==> exists %s", &tempCrop))
 
	 return tempCrop, nil
 
 }
 