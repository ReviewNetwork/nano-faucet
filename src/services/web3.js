const Web3 = require('web3')
const provider = require('@services/web3-provider')

module.exports = new Web3(provider)
