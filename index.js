const {buildTransaction,sendTransaction} = require('./pantheon_utils/web3Operations')
const {createRandomString} = require("./lib/helpers")
const {append} = require("./lib/logs")
const numberOfTransactions = parseInt(process.argv.slice(2)[0],10)  //500 //set this number to set the amount of transactions
const amountData =process.argv.slice(2)[1] //data to store in bytes on each transaction
const addressTo = '0xf17f52151EbEF6C7334FAD080c5704D77216b732'
const valueInEther = "0"
let fileName=`${numberOfTransactions}-txs-0-bytesperTx`
let randomData=null
let t1=null
let count = 0

if(amountData){
  try{
    randomData = createRandomString(parseInt(amountData))    
    if(!randomData){
      console.log("amount of data(second argument) must be an integer")
      process.exit()
    }
    fileName=`${numberOfTransactions}-txs-${amountData}-bytesperTx`
    //console.log("Generated random data", randomData)
  }catch(e){
    console.log("if you want to simulate data, then indicate amount of data in bytes")
    process.exit()
  }
}else{
  randomData=""
}

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
  try{
    const txCount = 0//await web3.eth.getTransactionCount(addressFrom)
    const txObject = buildTransaction(txCount,addressTo,valueInEther,addtionalData)
    await sendTransaction(txObject,privKey)//const receipt = await sendTransaction(txObject,privKey)//only awaiting here for pantheon response
    const txTimeResponse = (Date.now() - t1)
    count++
    append(`${fileName}`,`${txTimeResponse.toString()},${(numberOfTransactions-count).toString()}`) //sending without awaitng
    //console.log(`Transaction N° ${i} Stored on block `,receipt.blockNumber,"...")
    if(count===numberOfTransactions){
      console.log("All done!!")
    }    
  }catch(e){
    console.log(`Error with transaction N° ${i} => ${e.message}\n Error occurred in privateKey: ${privKey}`)
  }
}

const sendTxs =  numberOfTransactions => {
  const randomPrivateKeys = generateKeys(numberOfTransactions)
  for(i=0;i<numberOfTransactions;i++){
    const txSendingTime = Date.now() - t1
    append(`${fileName}`,`${txSendingTime.toString()},${(i+1).toString()}`)
    publishData(randomPrivateKeys[i],i,randomData)    
  }
}


t1 = Date.now()
sendTxs(numberOfTransactions)
const t2 = Date.now()
console.log("N° Tx: ",numberOfTransactions)
const delta = (t2-t1)/1000
console.log("time:", delta)
const rate = numberOfTransactions/(delta)
console.log("Rate: ",rate, "tx/s")
