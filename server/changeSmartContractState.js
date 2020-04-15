const {web3} = require("./pantheon_utils/web3")
// set to 1 for faster validation in this course.
web3.transactionConfirmationBlocks = 1


const set = () => {
  console.log("#######################Setting new value#######################")
  const functionName = "setValue"
  const typeOfData = "uint256"
  const valueToSet = 67
  let set = web3.eth.abi.encodeFunctionSignature(`${functionName}(${typeOfData})`)//function name to use
  let value = web3.eth.abi.encodeParameter('uint256', valueToSet)//setting the value

  const txData = set + value.substr(2)
  return txData
}

module.exports = {set}