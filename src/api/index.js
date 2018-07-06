const { Router } = require('express')
const FaucetApi = require('@api/faucet')

module.exports = () => {
  let api = Router()

  api.use('/request/:address', FaucetApi.requestEther)
  api.use('/status', FaucetApi.getStatus)

  return api
}
