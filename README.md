# Nano Faucet

A minimal faucet API for Ethereum.

## Why

You have developed a nice dApp. And you want people to try it. But people don't want to bother getting test ether. You know there exists [faucet.ropsten.be](http://faucet.ropsten.be:3001/), but it's public and supports only Ropsten. Also, you know you could deploy your own [locals-faucetserver](https://github.com/sponnet/locals-faucetserver), but it requires you to set up a Firebase account, and you're too lazy (aren't we all <3).

So you deploy this super micro nano faucet in no time, add some test ether to it, and start rolling! Now, your users can start testing your dApp seamlessly.

So, the intended use case is providing some test ether to your dApp users automatically. It's not intended for public use. Ideally, your Front End would generate a new wallet for the user, then make an HTTP request to your faucet and get a small amount (0.01 ETH or whatevs) so the user can call methods on your smart contract and pay for gas.

## Quick Rundown

1. Self hosted Ethereum faucet
2. Supports whichever Ethereum test network, over Http or Web Sockets
3. You don't need a local GETH node, Infura is fine
4. No fuss deployment - you only need NodeJS
5. Super simple configuration
6. Exposed as an API, no Front End
7. No queuing - sends ether right away

## Installation

1. Clone the repo
2. Edit the configuration
3. Send some ether to the wallet specified in config
4. `npm start` (starts the server locally)

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

Paste your private key here. **Important** you must remove the `0x` from the start of the key.

### ETH_PAYOUT

Defines how much Ether you'll give per user.

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

## API

The faucet exposes an API allowing CORS.

### GET /status

Returns:

- `balance` - Remaining balance in the faucet wallet
- `address` - Public address of the faucet wallet

### GET /request/:address

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

## Licence

MIT
