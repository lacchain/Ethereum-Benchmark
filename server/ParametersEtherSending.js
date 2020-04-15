const {verifyDesiredRate,verifyTestime} = require("./lib/helpers")
const {createRandomString} = require("./lib/helpers")
const {AMOUNT_DATA_BYTES,NUMBER_OF_CONTAINERS,TEST_TIME_MINUTES,DESIRED_RATE_TX} = require("./keys")
const {verifyAmountData,verifyNumberOfContainers} = require("./lib/helpers")

///////////////////////////////////VERIFICATIONS/////////////////////////////////////////////
const desiredRateTx = verifyDesiredRate(parseInt(DESIRED_RATE_TX))
const amountData =verifyAmountData(AMOUNT_DATA_BYTES) //data to store in bytes on each transaction
const numerOfContainers = verifyNumberOfContainers(NUMBER_OF_CONTAINERS)
const testTimeMinutes = verifyTestime(TEST_TIME_MINUTES)

///////////////////////////////////PROCESS VARIABLES/////////////////////////////////////////////
let randomData=""
let fileNameStimulus=`${desiredRateTx*numerOfContainers}-txsPerSec-0-bytesperTx-${testTimeMinutes}-minutes-stimulus`
let fileNameResponse=`${desiredRateTx*numerOfContainers}-txsPerSec-0-bytesperTx-${testTimeMinutes}-minutes-response`

if(amountData>0){
  randomData = createRandomString(parseInt(amountData))
  fileNameStimulus=`${desiredRateTx*numerOfContainers}-txsPerSec-${amountData}-bytesperTx-${testTimeMinutes}-minutes-stimulus`
  fileNameResponse=`${desiredRateTx*numerOfContainers}-txsPerSec-${amountData}-bytesperTx-${testTimeMinutes}-minutes-response`
}

module.exports = {
  fileNameStimulus,fileNameResponse,randomData
}