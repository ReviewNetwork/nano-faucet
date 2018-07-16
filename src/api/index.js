const { Router } = require('express')
const config = require('@/config')
const GeneralApi = require('@api/general')
const FaucetEthApi = require('@api/faucet-eth')

const tokenName = config.ERC20_NAME.toLowerCase()

module.exports = () => {
  let api = Router()

  if (config.FAUCET_DRIPS_ETH) {
    api.use('/request/eth/:address', FaucetEthApi.request)
    api.use('/status/eth', FaucetEthApi.getStatus)
  }

  if (config.FAUCET_DRIPS_ERC20) {
    const FaucetErc20Api = require('@api/faucet-erc20')
    api.use(`/request/${tokenName}/:address`, FaucetErc20Api.request)
    api.use(`/status/${tokenName}`, FaucetErc20Api.getStatus)
  }

  api.use('/', GeneralApi.getRootMessage)

  return api
}
