const {execEtherTest} = require("./TestEtherSending")
const {execSmartContractTest} = require("./TestSmartContract")
const type = process.env.TEST_TYPE

if (type === "0") {
  console.log("Executing Ether sending test ...")
  execEtherTest()
}

if (type === "1") {
  console.log("Executing Smart Contract test ...")
  execSmartContractTest()
}