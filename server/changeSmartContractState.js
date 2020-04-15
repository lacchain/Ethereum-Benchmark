const {web3} = require("./pantheon_utils/web3")
// set to 1 for faster validation in this course.
web3.transactionConfirmationBlocks = 1
const sha3 = require("js-sha3").keccak_256

const set1 = () => {
  console.log("#######################Setting new value#######################")
  const functionName = "setValue"
  const typeOfData = "uint256"
  const valueToSet = 67
  let set = web3.eth.abi.encodeFunctionSignature(`${functionName}(${typeOfData})`)//function name to use
  let value = web3.eth.abi.encodeParameter('uint256', valueToSet)//setting the value

  const txData = set + value.substr(2)
  return txData
}

const set = () => { //Set For David-19 smart contract
  console.log("#######################Setting new value#######################")
  const functionName = "register"
  const typeOfData = "bytes32,bytes32,uint256,uint256,uint8,uint8,bytes6,uint8,uint8"
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
  let set = web3.eth.abi.encodeFunctionSignature(`${functionName}(${typeOfData})`)//function name to use
  //let value = web3.eth.abi.encodeParameter('uint256', valueToSet)//setting the value
  let value = web3.eth.abi.encodeParameters(
    ["bytes32","bytes32","uint256","uint256","uint8","uint8","bytes6","uint8","uint8"],
    [hash,id,startDate,exp,sex,age,geoHash,credentialType,reason])//setting the value
  const txData = set + value.substr(2)
  //console.log(txData)
  return txData
}

//set()
module.exports = {set}