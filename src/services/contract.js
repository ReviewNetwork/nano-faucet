const web3 = require('@/services/web3')

class Contract {
  async sendSigned(query) {
    return web3.eth.net.getId()
      .then(async networkId => {
        let from = this.wallet.address
        const encodedABI = query.encodeABI()

        let gas = await query.estimateGas()

        const tx = {
          from,
          to: this.contractAddress,
          data: encodedABI,
          gas,
          chainId: networkId,
        }

        const key = this.wallet.privateKey

        return web3.eth.accounts.signTransaction(tx, key)
          .then(signed => new Promise((resolve, reject) => {
            web3.eth.sendSignedTransaction(signed.rawTransaction)
              .once('confirmation', (confirmationNumber, receipt) => {
                if (receipt.status === '0x0') {
                  reject(receipt)
                } else {
                  resolve()
                }
              })
              .once('error', error => {
                reject(error)
              })
          }))
      })
  }

  get contract() {
    if (this.contractInstance) {
      return this.contractInstance
    }

    let from = this.wallet.address

    this.contractInstance = new web3.eth.Contract(
      this.contractAbi,
      this.contractAddress,
      { from }
    )

    return this.contractInstance
  }
}

module.exports = Contract
