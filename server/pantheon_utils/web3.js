const Web3 = require('web3')
const ethTx = require('ethereumjs-tx')
const {RPC_URL} =  require('../keys')
// web3 initialization - must point to the HTTP JSON-RPC endpoint
const web3 = new Web3(new Web3.providers.HttpProvider(RPC_URL))

module.exports = {web3,ethTx}