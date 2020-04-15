const {buildTransaction} = require('./pantheon_utils/web3Operations')
const {sendTransactionAndProcessIncommingTx} = require("./lib/helpers")
const {test} = require("./Tester")
const valueInEther = "0"
const addressTo = '0xf17f52151EbEF6C7334FAD080c5704D77216b732'
const {fileNameStimulus,fileNameResponse,randomData} = require('./ParametersEtherSending')
 
const publishEtherTransaction = (privKey,t1,numberOfTransactions) => {
  const txCount = 0 //await web3.eth.getTransactionCount(addressFrom)
  const txObject = buildTransaction(txCount,addressTo,valueInEther,randomData)
  sendTransactionAndProcessIncommingTx(txObject,privKey,t1,fileNameResponse,numberOfTransactions)  
}

const execEtherTest = () => {  
  test(fileNameStimulus,publishEtherTransaction)
}

module.exports = {execEtherTest}