const {buildTransaction,sendTransaction,getTransaction} = require('./pantheon_utils/web3Operations')
const {createRandomString} = require("./lib/helpers")

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

const addressTo = '0xf17f52151EbEF6C7334FAD080c5704D77216b732'
const valueInEther = "0"

const publishData = async(privKey,i) => {
  try{
    const txCount = 0//await web3.eth.getTransactionCount(addressFrom)
    const txObject = buildTransaction(txCount,addressTo,valueInEther,"some custom data")
    const receipt = await sendTransaction(txObject,privKey)
    console.log(`Transaction N° ${i} Stored on block `,receipt.blockNumber,"...")
    //const receivedTx = await getTransaction(receipt.transactionHash)
    //await create(`block-${receipt.blockNumber}-storedData-${count}`,customData)
    //await create(`block-${receipt.blockNumber}-receivedTx`, JSON.stringify(receivedTx))

    //return {outgoing:txObject.data,incoming:receivedTx.input}
  }catch(e){
    console.log(`Error with transaction N° ${i} => ${e.message}\n Error occurred in privateKey: ${privKey}`)
  }
}

const sendTxs =  numberOfTransactions => {
  const randomPrivateKeys = generateKeys(numberOfTransactions)
  for(i=0;i<numberOfTransactions;i++){
    //console.log("sending with pK: ",randomPrivateKeys[i])
    publishData(randomPrivateKeys[i],i)
  }
}

const numberOfTransactions = 500 //set this number to set the amount of transactions
const t1 = Date.now()
sendTxs(numberOfTransactions)
const t2 = Date.now()
const delta = (t2-t1)/1000
console.log("time:", delta)
const rate = numberOfTransactions/(delta);
console.log("Rate: ",rate, "tx/s")