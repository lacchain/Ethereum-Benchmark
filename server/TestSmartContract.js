const {buildTransaction} = require('./pantheon_utils/web3Operations')
const {sendTransactionAndProcessIncommingTx} = require("./lib/helpers")
const {test} = require("./Tester")
const {web3} =  require("./pantheon_utils/web3")
const valueInEther = "0"
let addressTo
const {fileNameStimulus,fileNameResponse} = require('./ParametersSmartContractSending')

const {deploy} = require('./deployPublicSmartContract')
const isContractAddress = process.env.SMART_CONTRACT_ADDRESS
const {set} = require('./changeSmartContractState')
let txData

const getSmartContractParameters = async() => {
  if (isContractAddress) {
    addressTo = process.env.SMART_CONTRACT_ADDRESS
    console.log("Using existing contract address", addressTo)
  }else{
    addressTo = await deploy()
  }

  txData = set()  
}

const publishSmartContractTransaction = async(privKey,t1,numberOfTransactions) => {
  const txCount = 0
//  const txCount = await web3.eth.getTransactionCount("0xCC9a2ae1162D5de44E11363556c829D6c08f7dc9","pending")

  //const txObject = buildTransaction(txCount+i,addressTo,valueInEther,txData)
  const txObject = buildTransaction(txCount,addressTo,valueInEther,txData)
  sendTransactionAndProcessIncommingTx(txObject,privKey,t1,fileNameResponse,numberOfTransactions)  
}

const execSmartContractTest = async() => {
  await getSmartContractParameters()
  test(fileNameStimulus,publishSmartContractTransaction)
}

module.exports = {execSmartContractTest}
