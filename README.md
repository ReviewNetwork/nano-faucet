# Nano Faucet

A minimal faucet API for Ethereum and ERC20 tokens.

## Why

You have developed a nice dApp. And you want people to try it. But people don't want to bother getting test ether. You know there exists [faucet.ropsten.be](http://faucet.ropsten.be:3001/), but it's public and supports only Ropsten. Also, you know you could deploy your own [locals-faucetserver](https://github.com/sponnet/locals-faucetserver), but it requires you to set up a Firebase account, and you're too lazy (aren't we all <3).

So you deploy this super micro nano faucet in no time, add some test ether and / or your ERC20 tokens to it, and start rolling! Now, your users can start testing your dApp seamlessly.

So, the intended use case is providing some test ether and / or your ERC20 token to your dApp users automatically. It's not intended for wide audience use. Ideally, your Front End would generate a new wallet for the user, then make an HTTP request to your faucet and get a small amount (0.01 ETH or whatevs) so the user can call methods on your smart contract and pay for gas.

Also, ideally, you'd create another layer on top of this faucet that provides authentication, rate limiting or other niceties. Imagine having a publicly available "faucet gateway" that makes sure that the faucet drips only once every minute, and this faucet service behind it, being only accessible by the gateway.

## Quick Rundown

1. Self hosted Ethereum + ERC20 faucet
2. Supports whichever Ethereum test network, over Http or Web Sockets
3. You don't need a local GETH node, Infura is fine
4. Supports any ERC20 token
5. No fuss deployment - you only need NodeJS
6. Super simple configuration
7. Exposed as an API, no Front End
8. No queuing - sends ether right away

## Installation

1. Clone the repo
2. Edit the configuration
3. Send some ether to the wallet specified in config
4. If you turn on the ERC20 module, send some of your tokens to the wallet specified in config
5. `npm start` (starts the server locally)

### Note

- The easiest way is to use an automated NodeJS deployment solution like Now or Heroku
- If you're deploying to a VPS, you'll need to configure your server to pass requests to the Node app (reverse proxy)

## Configuration

To tell the faucet how to work, do this:

```sh
cp .env.example .env
vim .env
```

Then just change the parameters in the `.env` file.

### ETH_PRIVATE_KEY

Paste your private key here. This wallet will be used to drip ETH.

**Important** you must remove the `0x` from the start of the key.

### ETH_PAYOUT

Defines how much Ether you'll give per request.

### ETH_NODE_URL

Url of the Ethereum node you'll be connecting to. Here are some examples:

- `https://ropsten.infura.io` - Infura Ropsten over HTTP
- `wss://ropsten.infura.io` - Infura Ropsten over WebSocket
- `https://rinkeby.infura.io` - Infura Rinkeby over HTTP
- `https://kovan.infura.io` - Infura Kovan over HTTP
- `http://178.33.23.12` - Your GETH node running on a VPS over HTTP
- `ws://178.33.23.12` - Your GETH node running on a VPS over WebSocket

### DEBUG_MESSAGES

If set, prints a few debug messages to the console whenever someone requests some ETH.

### FAUCET_DRIPS_ETH

If set, your faucet will drip ETH. If not, no API routes for ETH will be created.

### FAUCET_DRIPS_ERC20

If set, your faucet will drip your configured ERC20 token. If not, no API routes for your token will be created.

### ERC20_CONTRACT_ADDRESS

Address of your ERC20 token smart contract. Make sure that it's on the same testnet used by `ETH_NODE_URL`.

### ERC20_PRIVATE_KEY

Paste your private key here. This wallet will be used to drip your ERC20 token. Remember to send some ether to it too, it will be needed to transaction fees!

**Important** you must remove the `0x` from the start of the key.

### ERC20_ABI

JSON ABI of your ERC20 contract. You'll see that we included the default ERC20 ABI, so you most likely don't need to edit this. If you are using a different token standard like ERC777, than add your token's ABI here.

### ERC20_NAME

Enter the name of your token here, e.g. `'REW'`.

### ERC20_PAYOUT

Defines how much of your ERC20 token you'll give per request.

## API

The faucet exposes an API allowing CORS.

### ETH

#### GET /status/eth

Returns:

- `balance` - Remaining balance in the faucet ETH wallet
- `address` - Public address of the faucet ETH wallet
- `currency` - Currency that we're referring to. In this case it's always ETH.

#### GET /request/eth/:address

Allows you to request Ether to be sent to the `address`.

The request will be open until the transaction is mined, so don't be alarmed if it takes 30 sec - 1 min to finish. When calling it from front end, make sure to either do it in background and notify the user once it's complete, or to display some cat gifs while loading.

Parameters:

- `address` - Address that will receive Ether

Returns:

- `transactionHash` - You can use it to find the transaction on Etherscan
- `remainingBalance` - Faucet's remaining balance in ETH
- `amount` - Amount sent to the address

Possible errors:

- Throws an error if there is not enough ether in the faucet to complete the request
- Throws an error if you try to get ether for an address multiple times, while the first request wasn't yet mined

### ERC20

#### GET /status/:tokenName (e.g. /status/rew)

Returns:

- `balance` - Remaining balance in the faucet ETH wallet
- `address` - Public address of the faucet ETH wallet
- `currency` - Currency that we're referring to. Taken from `ERC20_NAME` config parameter.

#### GET /request/:tokenName/:address (e.g. /request/rew/0x123...)

Allows you to request your ERC20 token to be sent to the `address`.

The request will be open until the transaction is mined, so don't be alarmed if it takes 30 sec - 1 min to finish. When calling it from front end, make sure to either do it in background and notify the user once it's complete, or to display some cat gifs while loading.

Parameters:

- `address` - Address that will receive Ether

Returns:

- `remainingBalance` - Faucet's remaining balance in ERC20
- `amount` - Amount sent to the address

Possible errors:

- Throws an error if there is not enough ERC20 tokens in the faucet to complete the request
- Throws an error if you try to get tokens for an address multiple times, while the first request wasn't yet mined

## How it works

The faucet generates and signs raw transactions, then sending them to the blockchain. This means the you don't have to have your own GETH node with accounts unlocked, which is nice.

## Licence

MIT
