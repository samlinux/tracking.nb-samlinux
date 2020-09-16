/**
 * test for our super fabric REST API
 */
const supertest = require('supertest');
const util = require('util');
const api = supertest('localhost:3000');

async function doTest1(maxInt){
  let key = getRandomInt(maxInt);
  console.log('key: ',key)
  let result = await api.get('/getHistory/'+key)
  let tx = JSON.parse(result.body.value);
  console.log(util.inspect(tx,false, null, true));
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

async function doTest2(maxInt){
  let key = getRandomInt(maxInt);
    key = key.toString();
    //key = '30353'
    let actor = 'post_office';
    console.log('send PI ',key)
    let payload = { 
      data: {
        key: key,
        actor: actor
      }
    }

    let result = await api.post('/store').send(payload)
    //console.log(result.body);
}

describe("tracking.nb.samlinux.com API tests", function() {
  it("checks if api is running", async function() {
    this.skip();
    let result = await api.get('/')
    console.log(result.body)
  }) 
  
  it("create asset", async function() {
    //this.skip();
    let maxInt = 1000000;
    setInterval(doTest2, 100, maxInt);
  })

  it("get getHistory", async function() {
    this.skip();
    /*
    let key = '100' ;
    let result = await api.get('/getHistory/'+key)

    let tx = JSON.parse(result.body.value);
    console.log(util.inspect(tx,false, null, true));
     */ 
    // 1500 milliseconds = 1,5 seconds
    // 200 ms = 5 tps
    // 100 ms = 10 tps
    // 10 ms = 100 tps
    // 20 ms = 50 tps
    // 30 ms = 33 tps
    setInterval(doTest1, 30, 10);
    
   
    /*
    tx.forEach(tx => {
       console.log(util.format('TxId: %s',tx.TxId)) 
    });
    */
  })

})