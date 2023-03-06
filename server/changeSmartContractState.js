const {
  getPubKey,
  getSignature,
  getMessage,
} = require("./pantheon_utils/falcon");
const { web3 } = require("./pantheon_utils/web3");
// set to 1 for faster validation in this course.
web3.transactionConfirmationBlocks = 1;
const sha3 = require("js-sha3").keccak_256;
const SMART_CONTRACT_OPTION = process.env.SMART_CONTRACT_OPTION;
let set;

const setSimpleStorage = () => {
  console.log(
    "#######################Preparing value for simple storage smart contract stress test#######################"
  );
  const functionName = "setValue";
  const typeOfData = "uint256";
  const valueToSet = 67;
  let set = web3.eth.abi.encodeFunctionSignature(
    `${functionName}(${typeOfData})`
  ); //function name to use
  let value = web3.eth.abi.encodeParameter("uint256", valueToSet); //setting the value

  const txData = set + value.substr(2);
  return txData;
};

const setDavid19 = () => {
  //Set For David-19 smart contract
  console.log(
    "#######################Preparing value for David-19 smart contract stress test #######################"
  );
  const functionName = "register";
  const typeOfData =
    "bytes32,bytes32,uint256,uint256,uint8,uint8,bytes6,uint8,uint8";
  //const valueToSet = 67
  const hash = "0x" + sha3("some");
  const id = "0x" + sha3("some");
  const startDate = 123456;
  const exp = 567890;
  const sex = 0;
  const age = 56;
  const geoHash = "0x123456789012"; //https://www.movable-type.co.uk/scripts/geohash.html
  const credentialType = 0; //confinement
  const reason = 3;
  let set = web3.eth.abi.encodeFunctionSignature(
    `${functionName}(${typeOfData})`
  ); //function name to use
  //let value = web3.eth.abi.encodeParameter('uint256', valueToSet)//setting the value
  let value = web3.eth.abi.encodeParameters(
    [
      "bytes32",
      "bytes32",
      "uint256",
      "uint256",
      "uint8",
      "uint8",
      "bytes6",
      "uint8",
      "uint8",
    ],
    [hash, id, startDate, exp, sex, age, geoHash, credentialType, reason]
  ); //setting the value
  const txData = set + value.substr(2);
  //console.log(txData)
  return txData;
};

const setFalconVerifier = () => {
  console.log(
    "#####################Preparing transaction for Falcon Verifier stress test  ######################"
  );
  const functionName = "falconVerify";
  const typeOfData = "bytes,bytes,bytes";
  const signature = getSignature();
  const message = getMessage();
  const pubKey = getPubKey();
  const set = web3.eth.abi.encodeFunctionSignature(
    `${functionName}(${typeOfData})`
  );
  const value = web3.eth.abi.encodeParameters(
    ["bytes", "bytes", "bytes"],
    [signature, pubKey, message]
  );
  const txData = set + value.substr(2);
  return txData;
};

const setRelayMetaTx = () => {
  console.log(
    "#####################Preparing falcon meta transaction for RelayMin  ######################"
  );
  const functionName = "relayMetaTx";
  const typeOfData = "bytes,uint8,bytes32,bytes32,bytes,bytes";
  const signature = getSignature();
  const message = getMessage();
  const pubKey = getPubKey();
  const set = web3.eth.abi.encodeFunctionSignature(
    `${functionName}(${typeOfData})`
  );
  const value = web3.eth.abi.encodeParameters(
    ["bytes", "uint8", "bytes32", "bytes32", "bytes", "bytes"],
    [
      message,
      "0x2a",
      "0xa2d2b1021e1428740a7c67af3c05fe3160481889b25b921108ac0ac2c3d5d40a",
      "0x63186d2aaefe188748bfb4b46fb9493cbc2b53cf36169e8501a5bc0ed941b484",
      signature,
      pubKey,
    ]
  );
  const txData = set + value.substr(2);
  return txData;
};

const chooseSmartContractSetter = () => {
  if (SMART_CONTRACT_OPTION == 0) {
    set = setSimpleStorage;
  } else if (SMART_CONTRACT_OPTION == 1) {
    set = setDavid19;
  } else if (SMART_CONTRACT_OPTION == 2) {
    set = setFalconVerifier;
  } else if (SMART_CONTRACT_OPTION == 3) {
    set = setRelayMetaTx;
  }
};

chooseSmartContractSetter();

//set()
module.exports = { set };
