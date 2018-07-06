require('dotenv').config()

const env = (name, fallback = '') => process.env[name] || fallback

module.exports = {
  PORT: env('PORT', 3000),
  DEBUG_MESSAGES: JSON.parse(env('DEBUG_MESSAGES', 'false')),

  ETH_NODE_URL: env('ETH_NODE_URL', 'https://ropsten.infura.io'),
  ETH_PRIVATE_KEY: env('ETH_PRIVATE_KEY', ''),
  ETH_PAYOUT: env('ETH_PAYOUT', '0')
}
