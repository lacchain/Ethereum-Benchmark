const {buildTransaction,sendTransaction} = require('./pantheon_utils/web3Operations')
const {createRandomString} = require("./lib/helpers")
const {append} = require("./lib/logs")
const numberOfTransactions = parseInt(process.argv.slice(2)[0],10)  //500 //set this number to set the amount of transactions
const amountData =process.argv.slice(2)[1] //data to store in bytes on each transaction
const timeOut = parseInt(process.argv.slice(2)[2]) //miliseconds
const addressTo = '0xf17f52151EbEF6C7334FAD080c5704D77216b732'
const valueInEther = "0"
let fileNameStimulus=`${numberOfTransactions}-txs-0-bytesperTx-stimulus`
let fileNameResponse=`${numberOfTransactions}-txs-0-bytesperTx-response`
let randomData=null
let t1=null
let count = 0
let failed = 0

/**
 * @TODO Take this function to a helper
 * input: amountData
 * output: fileName, random data
 */
if(amountData && parseInt(amountData)!==0){
  try{
    randomData = createRandomString(parseInt(amountData))    
    if(!randomData){
      console.log("amount of data(second argument) must be an integer")
      process.exit()
    }
    fileNameStimulus=`${numberOfTransactions}-txs-${amountData}-bytesperTx-stimulus`
    fileNameResponse=`${numberOfTransactions}-txs-${amountData}-bytesperTx-response`
    //console.log("Generated random data", randomData)
  }catch(e){
    console.log("if you want to simulate data, then indicate amount of data in bytes")
    process.exit()
  }
}else{
  randomData=""
}

/**
 * 
 * @TODO take this to helpers
 * inputs: i (number of keys to generate)
 * output: array of privateKeys
 */
const generateKeys = i => {
  const privateKeys = []
  for(k=1;k<=i;k++){
    let randomHexKey = createRandomString(64)
    const bufferRandomKey = Buffer.from(randomHexKey,'hex')    
    privateKeys.push(bufferRandomKey)
  }
  //console.log(privateKeys)
  return privateKeys
}


const publishData = async(privKey,i,addtionalData="") => {
  let txTimeResponse
  try{
    const txCount = 0//await web3.eth.getTransactionCount(addressFrom)
    const txObject = buildTransaction(txCount,addressTo,valueInEther,addtionalData)
    await sendTransaction(txObject,privKey)//const receipt = await sendTransaction(txObject,privKey)//only awaiting here for pantheon response
    txTimeResponse = (Date.now() - t1)    
    append(`${fileNameResponse}`,`${txTimeResponse.toString()},${(numberOfTransactions-count).toString()}`) //sending without awaitng
    count++
    //console.log(`Transaction N° ${i} Stored on block `,receipt.blockNumber,"...")        
  }catch(e){
    console.log(`Error with transaction N° ${i} => ${e.message}\n Error occurred in privateKey: ${privKey}`)
    failed++
  }

  if((count+failed)===numberOfTransactions){
    showResponseResults(failed,txTimeResponse/1000)
    console.log("All done!!")
  }
}


let i = 0
const randomPrivateKeys = generateKeys(numberOfTransactions)

//@TODO: improve file name and randomData
const logOutputAndPublish = (pK,i) => {
  const txSendingTime = Date.now() - t1
  append(`${fileNameStimulus}`,`${txSendingTime.toString()},${(i+1).toString()}`)
  publishData(pK,i,randomData)
}

const sendTxs =  numberOfTransactions => {
  if(i<numberOfTransactions){
    logOutputAndPublish(randomPrivateKeys[i],i)
    setTimeout(()=>{
      i++
      sendTxs(numberOfTransactions)//using recursive strategy to achieve delay      
      //console.log("Entering here...")
      if(i==numberOfTransactions-1){
        showStimulusResults()
      }
    },timeOut)//waiting ...
  }
}

const showStimulusResults = () => {
  console.log("\n************STIMULUS STATISTICS***************")
  const t2 = Date.now()
  console.log("N° sent Tx: ",numberOfTransactions)
  const delta = (t2-t1)/1000
  console.log("time:", delta)
  const rate = numberOfTransactions/(delta)
  console.log("Rate: ",rate, "tx/s")
}

const showResponseResults = (failed,delta) => {
  console.log("\n************RESPONSE STATISTICS***************")  
  console.log("N° processed Tx by Pantheon: ",numberOfTransactions-failed)
  console.log(`N° no processed txs: ${failed}`)
  console.log(`response time (s):  ${delta}` )
  console.log(`Effectiveness(%): ${(numberOfTransactions-failed)/numberOfTransactions*100}%`)  
  const rate = numberOfTransactions/(delta)
  console.log("Average rate: ",rate, "tx/s")
}

t1 = Date.now()
console.log(`Please wait; this test will aproximately take ${timeOut/1000*2*numberOfTransactions} seconds...`)
sendTxs(numberOfTransactions)
