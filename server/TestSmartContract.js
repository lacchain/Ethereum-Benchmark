const {buildTransaction} = require('./pantheon_utils/web3Operations')
const {sendTransactionAndProcessIncommingTx} = require("./lib/helpers")
const {web3} =  require('./pantheon_utils/web3')
const {test} = require("./Tester")
const ethWallet = require('ethereumjs-wallet').default;
const valueInEther = "0"
let addressTo
const {fileNameStimulus,fileNameResponse} = require('./ParametersSmartContractSending')

const {deploy} = require('./deployPublicSmartContract')
const isContractAddress = process.env.SMART_CONTRACT_ADDRESS
const {set} = require('./changeSmartContractState')
let txData
let addressFrom = '0xfe3b557e8fb62b89f4916b721be55ceb828dbd73'


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
  const txObject = buildTransaction(0,addressTo,valueInEther,txData)
  sendTransactionAndProcessIncommingTx(txObject,privKey,t1,fileNameResponse,numberOfTransactions)
}

const execSmartContractTest = async() => {
  await getSmartContractParameters()
  test(fileNameStimulus,publishSmartContractTransaction)
}

module.exports = {execSmartContractTest}