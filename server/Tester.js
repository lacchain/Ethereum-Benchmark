const {generateKeys,verifyDesiredRate,verifyTestime,verifyAmountData} = require("./lib/helpers")
const {append} = require("./lib/logs")
const {DESIRED_RATE_TX,TEST_TIME_MINUTES,STORE_DATA,AMOUNT_DATA_BYTES} = require("./keys")

///////////////////////////////////VERIFICATIONS/////////////////////////////////////////////
const desiredRateTx = verifyDesiredRate(parseInt(DESIRED_RATE_TX))
const testTimeMinutes = verifyTestime(TEST_TIME_MINUTES)
const testTime = testTimeMinutes * 60//time in minutes => convert to seconds
const amountData =verifyAmountData(AMOUNT_DATA_BYTES) //data to store in bytes on each transaction

///////////////////////////////////PROCESS VARIABLES/////////////////////////////////////////////
let t1=null
let i = 0
let fileNameStimulus

const timeOut = 1/desiredRateTx * 1000
const numberOfTransactions = desiredRateTx * testTime
const randomPrivateKeys = generateKeys(numberOfTransactions)

////////////////////////////CORE FUNCTIONS///////////////////////////////////////////////////
let publishData

//@TODO: improve file name
const logOutputAndPublish = (pK,i) => {
  const txSendingTime = Date.now() - t1
  if(STORE_DATA=="TRUE"){
    append(`${fileNameStimulus}`,`${txSendingTime.toString()},${(i+1).toString()}`)
  }
  publishData(pK,t1,numberOfTransactions)
}

const sendTxs =  numberOfTransactions => {  

  if(i<numberOfTransactions){
    //publishing
    logOutputAndPublish(randomPrivateKeys[i],i)
    
    //waiting
    while((Date.now() - tPrevious) < timeOut){
    //waiting => more precise   
    }

    tPrevious=Date.now()

     //Finishing
    if(i==numberOfTransactions-1){
      showStimulusResults()
    }

    //recursive
    i++
    setTimeout(()=>{
    sendTxs(numberOfTransactions)//using recursive strategy to achieve delay
    },0)
    //sendTxs(numberOfTransactions)//using recursive strategy to achieve delay
  }
}

///////////////////////////////////STIMULUS////////////////////////////////////////////////

const showStimulusResults = () => {
  console.log("\n************STIMULUS STATISTICS***************")
  const t2 = Date.now()
  console.log("N° sent Tx: ",numberOfTransactions)
  const delta = (t2-t1)/1000
  console.log("time (s):", delta)
  const rate = numberOfTransactions/(delta)
  console.log("Rate: ",rate, "tx/s")
  console.log("Data on each Tx (KB): ",amountData/1000)
}

////////////////////////////////////MAIN/////////////////////////////////////////////

t1 = Date.now()
let tPrevious = t1
const test = (inputFileName,transactionFunction) => {
  fileNameStimulus=inputFileName
  publishData = transactionFunction
  console.log(`Please wait; this test will aproximately take ${timeOut/1000*2*numberOfTransactions} seconds...`)
  sendTxs(numberOfTransactions)
}

module.exports = {test}