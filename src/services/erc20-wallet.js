const config = require('@/config')
const web3 = require('@services/web3')
const erc20 = require('@services/erc20')

const wallet = web3.eth.accounts.privateKeyToAccount(`0x${config.ERC20_PRIVATE_KEY}`)

const erc20Contract = erc20.contract

module.exports = {
  async sendErc20 ({ to, amount }) {
    const value = web3.utils.toBN(amount)
    return erc20.sendSigned(erc20Contract.methods.transfer(to, value))
  },

  async getBalance () {
    return erc20Contract.methods.balanceOf(wallet.address).call()
      .then(balance => Number(balance))
  },

  getAddress () {
    return wallet.address
  },

  getPrivateKey () {
    return wallet.privateKey
  }
}
