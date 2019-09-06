const {web3,ethTx} =  require('./web3')

function buildTransaction(txnCount,addressTo,valueInEther,customData){
    const data = web3.utils.toHex(customData)

    // Create the transaction object
    //console.log("outgoing data:",web3.utils.toHex(customData)) 
    return txObject = {
        nonce: web3.utils.toHex(txnCount),
        gasPrice: web3.utils.toHex(0),
        gasLimit: web3.utils.toHex(10000000),
        to: addressTo,
        value: web3.utils.toHex(web3.utils.toWei(valueInEther, 'ether')),
        data
    };
}

function buildSmartContractTransaction(txnCount,contractData){
    const data = web3.utils.toHex(contractData)

    // Create the transaction object
    //console.log("outgoing data:",web3.utils.toHex(customData)) 
    return txObject = {
        nonce: web3.utils.toHex(txnCount),
        gasPrice: web3.utils.toHex(0),
        gasLimit: web3.utils.toHex(10000000),
        data
    }
}

const sendTransaction= async(txObject,privKey)=>{
    //console.log('sending data...')

    const tx = new ethTx(txObject)
    tx.sign(privKey)

    const serializedTx = tx.serialize()
    const rawTxHex = '0x' + serializedTx.toString('hex')
    //console.log(rawTxHex)
    
    const receipt = await web3.eth.sendSignedTransaction(rawTxHex)
    return receipt
}

const getData = async(blockNumber)=>{
    const block = await web3.eth.getBlock(blockNumber)
    //console.log(block)
    await getTransaction(block.transactions[0])
}

const getTransaction = async txHash => {
    console.log("Retrieving transaction from Pantheon...")
    const receivedTX = await web3.eth.getTransaction(txHash)
    return receivedTX
}

module.exports = {
    buildTransaction,buildSmartContractTransaction,sendTransaction,getData,getTransaction
}