const config = require('@/config')
const { validateEthAddress } = require('@services/validator')
const wallet = require('@services/wallet')
const logger = require('@services/logger')

module.exports = {
  async request(req, res) {
    let { address } = req.params

    if (!address || !validateEthAddress(address)) {
      return res
        .json({ error: 'Invalid Ethereum address', input: address })
        .status(400)
    }

    const addressBalance = await wallet.getBalanceOfAddress(address)

    console.log({ addressBalance })
    if (Number(addressBalance) >= config.ETH_PAYOUT) {
      return res
        .json({
          error: 'You already have enough ETH!',
          balance: addressBalance,
          input: address
        })
        .status(400)
    }

    logger(`REQUESTED: ${config.ETH_PAYOUT} ETH from ${address}`)

    try {
      let { transactionHash } = await wallet.sendEther({
        to: address,
        amount: config.ETH_PAYOUT
      })

      let remainingBalance = await wallet.getBalance()

      logger(`SENT: ${config.ETH_PAYOUT} ETH to ${address}`)
      logger(`REMAINING: ${remainingBalance} ETH left in faucet`)
      return res.json({
        transactionHash,
        amount: config.ETH_PAYOUT,
        remainingBalance
      })
    } catch (ex) {
      logger(`ERROR: ${ex.message}`)
      return res.json({ error: ex.message, input: address }).status(400)
    }
  },

  async getStatus(req, res) {
    let balance = await wallet.getBalance()
    return res.json({ balance, address: wallet.getAddress(), currency: 'ETH' })
  }
}
