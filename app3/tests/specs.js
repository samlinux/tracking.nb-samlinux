/**
 * test for our super fabric REST API
 */
const supertest = require('supertest');
const util = require('util');
const api = supertest('localhost:3030');
const moment = require('moment');

describe("tracking.nb.samlinux.com API tests - Crop Tracing", function() {

  it("checks if api is running", async function() {
    this.skip();
    let result = await api.get('/')
    console.log(result.body)
  }) 

  it("create a crop", async function() {
    this.skip();
    let fpoName = 'fpo2';
    let cropName = 'Birne';
    let a = moment('2021-02-01').toISOString();
    let cropDate = a;
    let cropId = '10'

    let payload = { 
      data: {
        'fpoName': fpoName,
        'cropName': cropName,
        'cropDate': cropDate,
        'cropId': cropId
      }
    }

    let result = await api.post('/createCrop').send(payload)
    console.log(result.body);
  })
  
  it("set seed", async function() {
    this.skip();
    let key = 'fpo2~birne~2021~1';

    let cropName2 = 'Birne Elster';
    let cropVarityName = 'G9'
    let purchasedFrom = 'Hi Fl Biotech India Pvt Ltd, Salem"'
    let seedDate = moment('2021-02-14').toISOString();

    let payload = { 
      data: {
        'key': key,
        'cropName2': cropName2,
        'cropVarityName': cropVarityName,
        'purchasedFrom': purchasedFrom,
        'seedDate': seedDate
      }
    }

    let result = await api.post('/setSeed').send(payload)
    console.log(result.body);
  })

  it("add farmer", async function() {
    this.skip();
    let key = 'fpo2~birne~2021~1';

    let farmerName = 'Sonnental Sabine';
    let farmerAddress = 'Obere Linde 12, 9500 Villach'

    let payload = { 
      data: {
        'key': key,
        'farmerName': farmerName,
        'farmerAddress': farmerAddress
      }
    }

    let result = await api.post('/addFarmer').send(payload)
    console.log(result.body);
  })

  it("add inputs", async function() {
    this.skip();
    let key = 'fpo2~birne~2021~1';

    let inputName = 'BTX 200'
    let inputType = 'Organic'
    let inputPurchasedFrom = 'BCX Bio Moderna'
    let inputDate =  moment('2021-02-20').toISOString();

    let payload = { 
      data: {
        'key': key,
        'inputName': inputName,
        'inputType': inputType,
        'inputPurchasedFrom': inputPurchasedFrom,
        'inputDate':inputDate
      }
    }

    let result = await api.post('/addInputs').send(payload)
    console.log(result.body);
  })

  it("get full crop by fpo", async function() {
    this.skip();
    let payload = { 
      data: {
        'fpoName': 'fpo2'
      }
    }

    let result = await api.post('/getCropByFpo').send(payload)
    console.log(util.inspect(result.body,false, null, true));
  }) 

  it("get full crop by fpo and crop", async function() {
    this.skip();
    let payload = { 
      data: {
        'fpoName': 'fpo2',
        'cropName': 'Birne'
      }
    }

    let result = await api.post('/getCropByFpoCrop').send(payload)
    console.log(util.inspect(result.body,false, null, true));
  }) 

  it("get full crop by key", async function() {
    this.skip();
    let key = 'fpo2~birne~2021~1';
    let payload = { 
      data: {
        'key': key
      }
    }

    let result = await api.post('/getCrop').send(payload)
    console.log(util.inspect(result.body,false, null, true));
  })
  
  it("get full crop by barcode", async function() {
    //this.skip();
    let barcode = '1008';
    let payload = { 
      data: {
        'barcode': barcode
      }
    }

    let result = await api.post('/getCrop').send(payload)
    console.log(util.inspect(result.body,false, null, true));
  })
})