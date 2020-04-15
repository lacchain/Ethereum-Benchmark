const {web3,ethTx} =  require('./web3')
const {MAX_GAS_PER_TX} = require("../keys")

function buildTransaction(txnCount,addressTo,valueInEther,customData){
    const data = web3.utils.toHex(customData)

    // Create the transaction object
    //console.log("outgoing data:",web3.utils.toHex(customData)) 
    return txObject = {
        nonce: web3.utils.toHex(txnCount),
        gasPrice: web3.utils.toHex(0),
        gasLimit: web3.utils.toHex(parseInt(MAX_GAS_PER_TX)),
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
        gasLimit: web3.utils.toHex(800000000),
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

const deploySmartContract = async(contractData,addressFrom,privKey) => {
    try{
        const txCount = await web3.eth.getTransactionCount(addressFrom)
        const txObject = buildSmartContractTransaction(txCount,contractData)
        const receipt = await sendTransaction(txObject,privKey)
        //Retriveing contract address and transaction hash
        //console.log("Transaction hash: ", receipt.transactionHash)
        console.log("Contract address", receipt.contractAddress)
        //await create(`block-${receipt.blockNumber}-received-smart-contract-tx`, JSON.stringify(receipt))
        //console.log(`Contract address saved in path: \
        // ./.data/block-${receipt.blockNumber}-received-smart-contract-tx.txt`)
        return receipt.contractAddress
    }catch(e){
        console.log(e)
        process.exit()
    }
}

const getValueFromPublicBlockchain = async (EventEmitterAbi,address) => {//address: contract address
    //console.log("retrieving data from pantheon public smart contract...")
    const contractInstance = new web3.eth.Contract(EventEmitterAbi,address, {
      from: '0x1234567890123456789012345678901234567891', // default from address
      gasPrice: '0' // default gas price in wei, 20 gwei in this case
    })
    const value=await contractInstance.methods.getValue().call()
    console.log('value',value)
    return value
}

module.exports = {
    buildTransaction,
    buildSmartContractTransaction,
    sendTransaction,getData,
    getTransaction,
    deploySmartContract,
    getValueFromPublicBlockchain
}