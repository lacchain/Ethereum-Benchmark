const {web3} = require("./pantheon_utils/web3")
// set to 1 for faster validation in this course.
web3.transactionConfirmationBlocks = 1
const sha3 = require("js-sha3").keccak_256
const SMART_CONTRACT_OPTION  = process.env.SMART_CONTRACT_OPTION
let set

const setSimpleStorage = () => {
  console.log("#######################Preparing value for simple storage smart contract stress test#######################")
  const functionName = "store"
  const typeOfData = "uint256"
  const valueToSet = 78
  let set = web3.eth.abi.encodeFunctionSignature(`${functionName}(${typeOfData})`)//function name to use
  let value = web3.eth.abi.encodeParameter('uint256', valueToSet)//setting the value

  const txData = set + value.substr(2)
  return txData
}

const setDavid19 = () => { //Set For David-19 smart contract
  console.log("#######################Preparing value for David-19 smart contract stress test #######################")
  const functionName = "register"
  const typeOfData = "bytes32,bytes32,uint256,uint256,uint8,uint8,bytes6,uint8,uint8,bytes1"
  //const valueToSet = 67
  const hash = '0x' + sha3("some")  
  const id = '0x' + sha3("some")
  const startDate = 123456
  const exp = 567890
  const sex = 0
  const age = 56
  const geoHash = "0x123456789012" //https://www.movable-type.co.uk/scripts/geohash.html
  const credentialType = 0 //confinement
  const reason = 3
  const symptons = "0xab"
  let set = web3.eth.abi.encodeFunctionSignature(`${functionName}(${typeOfData})`)//function name to use
  //let value = web3.eth.abi.encodeParameter('uint256', valueToSet)//setting the value
  let value = web3.eth.abi.encodeParameters(
    ["bytes32","bytes32","uint256","uint256","uint8","uint8","bytes6","uint8","uint8","bytes1"],
    [hash,id,startDate,exp,sex,age,geoHash,credentialType,reason,symptons])//setting the value
  const txData = set + value.substr(2)
  //console.log(txData)
  return txData
}

const setRelayHub = () => { //Set For RelayHub smart contract
  console.log("#######################Preparing value for RelayHub smart contract stress test #######################")
  const functionName = "relayMetaTx"
  const typeOfData = "uint256,bytes,uint8,bytes32,bytes32"
  //const from = "0xbcEda2Ba9aF65c18C7992849C312d1Db77cF008E"  
  //const to = "0x7C2811cF65BDf68B0d643935Ee835bA8D9DD6B89"
  const encodedFunction = "0xf861808082ea6094fd32cfc2e71611626d6368a41f915d0077a306a180b8446057361d000000000000000000000000000000000000000000000000000000000000003c000000000000000000000000173cf75f0905338597fcd38f5ce13e6840b230e9"
  const gasLimit = 8579680
  //const nonce = 1
  const v = 27
  const r = "0xc799efa03b5704c80758759aa0844544a5afba312f1d6f4a49b27dcbd75d14fa"
  const s = "0x0f1ab4f7308759e83db3820377fc595f10bdf103273a54fc061c33746a296cd0"
  
  let set = web3.eth.abi.encodeFunctionSignature(`${functionName}(${typeOfData})`)//function name to use
  //let value = web3.eth.abi.encodeParameter('uint256', valueToSet)//setting the value
  let value = web3.eth.abi.encodeParameters(
    ["uint256","bytes","uint8","bytes32","bytes32"],
    [gasLimit,encodedFunction,v,r,s])//setting the value
  const txData = set + value.substr(2)
  console.log("txData:",txData)
  return txData
}

const setCrossBorder = () => { //Set For CrossBorder smart contract
  console.log("#######################Preparing value for CrossBorder smart contract stress test #######################")
  const functionName = "orderTransfer"
  const typeOfData = "string,address,address,uint256,uint256"
  const operationId = "1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd"  
  const to = "0x7C2811cF65BDf68B0d643935Ee835bA8D9DD6B89"
  const operatorExchange = "0xbcEda2Ba9aF65c18C7992849C312d1Db77cF008E"
  const valor = 0
  const rate = 0
  
  let set = web3.eth.abi.encodeFunctionSignature(`${functionName}(${typeOfData})`)//function name to use
  //let value = web3.eth.abi.encodeParameter('uint256', valueToSet)//setting the value
  let value = web3.eth.abi.encodeParameters(
    ["string","address","address","uint256","uint"],
    [operationId,to,operatorExchange,valor,rate])//setting the value
  const txData = set + value.substr(2)
  console.log("txData:",txData)
  return txData
}

const setARM = () => { //Set For CrossBorder smart contract
  console.log("#######################Preparing value for ARM smart contract stress test #######################")
  const functionName = "addCertificate"
  const typeOfData = "string,string,string,string,bool"
  const tin = "1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd"  
  const certificate = "1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd1234567890-abcdefghijk-lmnopqrd"
  const state = "el estado de la vida de los ninos es el mas calmado de este sitio"
  const observation = "la observacion de la vida y de los seres de este planeta tratar de guardar grandes cosas en pequenos paquetes de datos a veces no tiene sentido alguno para estos humanos"
  const visible = true
  
  let set = web3.eth.abi.encodeFunctionSignature(`${functionName}(${typeOfData})`)//function name to use
  //let value = web3.eth.abi.encodeParameter('uint256', valueToSet)//setting the value
  let value = web3.eth.abi.encodeParameters(
    ["string","string","string","string","bool"],
    [tin,certificate,state,observation,visible])//setting the value
  const txData = set + value.substr(2)
  console.log("txData:",txData)
  return txData
}

const chooseSmartContractSetter = () => {
  if (SMART_CONTRACT_OPTION==0){
    set = setSimpleStorage
  }else if (SMART_CONTRACT_OPTION==1) {
    set = setDavid19
  }else if (SMART_CONTRACT_OPTION==2){
    set = setRelayHub
  }else if (SMART_CONTRACT_OPTION==3){
    set = setCrossBorder
  }else if (SMART_CONTRACT_OPTION==4){
    set = setARM
  }
}

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}


chooseSmartContractSetter()

//set()
module.exports = {set}
