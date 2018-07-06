const web3 = require('@services/web3')

module.exports = {
  validateEthAddress (address) {
    let notEmpty = !!address
    return notEmpty && web3.utils.isAddress(address)
  }
}
