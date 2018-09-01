const config = require('@/config')
const { validateEthAddress } = require('@services/validator')
const erc20wallet = require('@services/erc20-wallet')
const logger = require('@services/logger')

module.exports = {
  async request (req, res) {
    let { address } = req.params

    if (!address || !validateEthAddress(address)) {
      return res.json({ error: 'Invalid Ethereum address', input: address }).status(400)
    }

    logger(`REQUESTED ERC20: ${config.ERC20_PAYOUT} ${config.ERC20_NAME} from ${address}`)

    try {
      await erc20wallet.sendErc20({ to: address, amount: config.ERC20_PAYOUT })

      let remainingBalance = await erc20wallet.getBalance()

      logger(`SENT ERC20: ${config.ERC20_PAYOUT} ${config.ERC20_NAME} to ${address}`)
      logger(`REMAINING ERC20: ${remainingBalance} ${config.ERC20_NAME} left in faucet`)
      return res.json({ amount: config.ERC20_PAYOUT, remainingBalance })
    } catch (ex) {
      logger(`ERROR: ${ex.message}`)
      return res.json({ error: ex.message, input: address }).status(400)
    }
  },

  async getStatus(req, res) {
    let balance = (await erc20wallet.getBalance()).toString()
    return res.json({ balance, address: erc20wallet.getAddress(), currency: config.ERC20_NAME.toUpperCase() })
  }
}
