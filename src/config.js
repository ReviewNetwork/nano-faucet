require('dotenv').config()

const env = (name, fallback = '') => process.env[name] || fallback

module.exports = {
  PORT: env('PORT', 3000),
  DEBUG_MESSAGES: JSON.parse(env('DEBUG_MESSAGES', 'false')),

  ETH_NODE_URL: env('ETH_NODE_URL', 'https://ropsten.infura.io'),
  ETH_PRIVATE_KEY: env('ETH_PRIVATE_KEY', ''),
  ETH_PAYOUT: env('ETH_PAYOUT', '0'),

  ERC20_CONTRACT_ADDRESS: env('ERC20_CONTRACT_ADDRESS', ''),
  ERC20_PRIVATE_KEY: env('ERC20_PRIVATE_KEY', ''),
  ERC20_ABI: JSON.parse(env('ERC20_ABI', 'false')),
  ERC20_NAME: env('ERC20_NAME', ''),
  ERC20_PAYOUT: env('ERC20_PAYOUT', '0'),

  FAUCET_DRIPS_ETH: JSON.parse(env('FAUCET_DRIPS_ETH', 'false')),
  FAUCET_DRIPS_ERC20: JSON.parse(env('FAUCET_DRIPS_ERC20', 'false')),
}
