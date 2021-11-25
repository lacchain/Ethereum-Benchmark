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
  // const privateKeyBuffer = EthUtil.toBuffer('0xf2ec77f749fc3a6552a4385ab043277463a8f359970dacc727a894db1c10d399');
   const wallet = ethWallet.fromPrivateKey(privKey);
   addressFrom = wallet.getAddressString()
   // console.log('addres   : ' + addressFrom);
  //const txCount = 0 
  const txCount =await web3.eth.getTransactionCount(addressFrom)
 // console.log("private key " + privKey)
  const txObject = buildTransaction(txCount,addressTo,valueInEther,txData)
  sendTransactionAndProcessIncommingTx(txObject,privKey,t1,fileNameResponse,numberOfTransactions)  
}

const execSmartContractTest = async() => {
  await getSmartContractParameters()
  test(fileNameStimulus,publishSmartContractTransaction)
}

module.exports = {execSmartContractTest}