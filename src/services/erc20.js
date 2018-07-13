const web3 = require('@/services/web3')
const config = require('@/config')
const Contract = require('@/services/contract')

class Erc20 extends Contract {
  constructor () {
    super()
    this.contractAddress = config.ERC20_CONTRACT_ADDRESS
    this.contractAbi = config.ERC20_ABI
    this.wallet = web3.eth.accounts.privateKeyToAccount(`0x${config.ERC20_PRIVATE_KEY}`)
  }
}

module.exports = new Erc20()
