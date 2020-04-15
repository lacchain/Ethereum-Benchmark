const {verifyDesiredRate,verifyTestime} = require("./lib/helpers")
const {NUMBER_OF_CONTAINERS,TEST_TIME_MINUTES,DESIRED_RATE_TX} = require("./keys")
const {verifyNumberOfContainers} = require("./lib/helpers")

///////////////////////////////////VERIFICATIONS/////////////////////////////////////////////
const desiredRateTx = verifyDesiredRate(parseInt(DESIRED_RATE_TX))
const numerOfContainers = verifyNumberOfContainers(NUMBER_OF_CONTAINERS)
const testTimeMinutes = verifyTestime(TEST_TIME_MINUTES)

///////////////////////////////////PROCESS VARIABLES/////////////////////////////////////////////
let fileNameStimulus=`${desiredRateTx*numerOfContainers}-txsPerSec-${testTimeMinutes}-minutes-stimulus`
let fileNameResponse=`${desiredRateTx*numerOfContainers}-txsPerSec-${testTimeMinutes}-minutes-response`

module.exports = {
  fileNameStimulus,fileNameResponse
}