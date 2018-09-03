const config = require('@/config');
const web3 = require('@services/web3');
const transaction = require('@services/transaction');

const wallet = web3.eth.accounts.privateKeyToAccount(
  `0x${config.ETH_PRIVATE_KEY}`
);

web3.eth.defaultAccount = wallet.address;
web3.eth.coinbase = wallet.address;

module.exports = {
  async sendEther({ to, amount }) {
    const value = web3.utils.toWei(amount, 'ether');

    let signedTransaction = await transaction.sign({
      from: wallet.address,
      to,
      value,
      key: config.ETH_PRIVATE_KEY
    });
    return transaction.send(signedTransaction);
  },

  async getBalance() {
    let balanceInWei = await web3.eth.getBalance(wallet.address);
    return web3.utils.fromWei(balanceInWei);
  },

  async getBalanceOfAddress(address) {
    let balanceInWei = await web3.eth.getBalance(address);
    return web3.utils.fromWei(balanceInWei);
  },

  getAddress() {
    return wallet.address;
  },

  getPrivateKey() {
    return wallet.privateKey;
  }
};
