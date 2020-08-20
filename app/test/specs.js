/**
 * test for our super fabric REST API
 */
const supertest = require('supertest');
const util = require('util');
const api = supertest('localhost:3000');

describe("tracking.nb.samlinux.com API tests", function() {
  it("checks if api is running", async function() {
    //this.skip();
    let result = await api.get('/')
    console.log(result.body)
  }) 
    
  it("get getHistory", async function() {
    //this.skip();
    let key = '1';

    let result = await api.get('/getHistory/'+key)

    let tx = JSON.parse(result.body.value);
    console.log(util.inspect(tx,false, null, true));
   /*
    tx.forEach(tx => {
       console.log(util.format('TxId: %s',tx.TxId)) 
    });
    */
  })

})