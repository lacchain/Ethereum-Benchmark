const {buildTransaction,sendTransaction} = require('./pantheon_utils/web3Operations')
const {createRandomString,generateKeys,verifyDesiredRate,verifyTestime,verifyAmountData} = require("./lib/helpers")
const {append} = require("./lib/logs")

///////////////////////////////////VERIFICATIONS/////////////////////////////////////////////
const desiredRateTx = verifyDesiredRate(parseInt(process.argv.slice(2)[0],10))
const amountData =verifyAmountData(process.argv.slice(2)[1]) //data to store in bytes on each transaction
const testTimeMinutes = verifyTestime(process.argv.slice(2)[2])
const testTime = testTimeMinutes * 60//time in minutes => convert to seconds

///////////////////////////////////PROCESS VARIABLES/////////////////////////////////////////////
const addressTo = '0xf17f52151EbEF6C7334FAD080c5704D77216b732'
const valueInEther = "0"
let randomData=""
let t1=null
let count = 0
let failed = 0
let i = 0

const timeOut = 1/desiredRateTx * 1000
const numberOfTransactions = desiredRateTx * testTime
const randomPrivateKeys = generateKeys(numberOfTransactions)
//log Files
let fileNameStimulus=`${desiredRateTx}-txsPerSec-0-bytesperTx-${testTimeMinutes}-minutes-stimulus`
let fileNameResponse=`${desiredRateTx}-txsPerSec-0-bytesperTx-${testTimeMinutes}-minutes-response`

if(amountData>0){
  randomData = createRandomString(parseInt(amountData))
  fileNameStimulus=`${desiredRateTx}-txsPerSec-${amountData}-bytesperTx-${testTimeMinutes}-minutes-stimulus`
  fileNameResponse=`${desiredRateTx}-txsPerSec-${amountData}-bytesperTx-${testTimeMinutes}-minutes-response`
}

////////////////////////////CORE FUNCTIONS///////////////////////////////////////////////////
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

///////////////////////////////////STIMULUS AND RESULTS////////////////////////////////////////////////

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
  console.log("Average responsiveness rate: ",rate, "tx/s")
}

////////////////////////////////////MAIN///////////////////////////////////////////

t1 = Date.now()
console.log(`Please wait; this test will aproximately take ${timeOut/1000*2*numberOfTransactions} seconds...`)
sendTxs(numberOfTransactions)

//node index.js rate(tx/s) amountDataBytes timeTest(minutes)
