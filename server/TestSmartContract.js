const {buildTransaction} = require('./pantheon_utils/web3Operations')
const { web3 } = require("./pantheon_utils/web3");
const {sendTransactionAndProcessIncommingTx} = require("./lib/helpers")
const {test} = require("./Tester")
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
  // const strPrivKey = "d7505cb4f3aec16303ef125b14c4af3c8a237ea1afe9726ede5697ea9f1479ec";
  // privKey = Buffer.from(strPrivKey,'hex');
  //const senderAddress = web3.eth.accounts.privateKeyToAccount(strPrivKey);
  const txCount = 0 // await web3.eth.getTransactionCount(senderAddress.address);

  const txObject = buildTransaction(txCount,addressTo,valueInEther,txData)
  sendTransactionAndProcessIncommingTx(txObject,privKey,t1,fileNameResponse,numberOfTransactions)  
}

const execSmartContractTest = async() => {
  await getSmartContractParameters()
  test(fileNameStimulus,publishSmartContractTransaction)
}

module.exports = {execSmartContractTest}