const config = require('@/config');
const web3 = require('@services/web3');
const erc20 = require('@services/erc20');

const wallet = web3.eth.accounts.privateKeyToAccount(
  `0x${config.ERC20_PRIVATE_KEY}`
);

const erc20Contract = erc20.contract;

const BN = web3.utils.BN;

module.exports = {
  async sendErc20({ to, amount }) {
    const decimals = new BN(await erc20Contract.methods.decimals().call());
    const ten = new BN(10, 10);
    const value = new BN(amount, 10).mul(ten.pow(decimals));
    return erc20.sendSigned(erc20Contract.methods.transfer(to, value));
  },

  async getBalance() {
    return erc20Contract.methods
      .balanceOf(wallet.address)
      .call()
      .then(balance => Number(balance));
  },

  async getBalanceOfAddress(address) {
    return erc20Contract.methods
      .balanceOf(address)
      .call()
      .then(balance => Number(balance));
  },

  getAddress() {
    return wallet.address;
  },

  getPrivateKey() {
    return wallet.privateKey;
  }
};
