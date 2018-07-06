const Web3 = require('web3')
const config = require('@/config')

Web3.providers.HttpProvider.prototype.sendAsync = Web3.providers.HttpProvider.prototype.send
Web3.providers.WebsocketProvider.prototype.sendAsync = Web3.providers.WebsocketProvider.prototype.send

const providers = {
  HTTP: Web3.providers.HttpProvider,
  WS: Web3.providers.WebsocketProvider
}

const getProviderFromUrl = url => {
  if (url.indexOf('http') === 0) {
    return providers.HTTP
  } else if (url.indexOf('ws') === 0) {
    return providers.WS
  } else {
    throw Error('Provider invalid')
  }
}

const providerType = getProviderFromUrl(config.ETH_NODE_URL)

module.exports = new providerType(config.ETH_NODE_URL)
