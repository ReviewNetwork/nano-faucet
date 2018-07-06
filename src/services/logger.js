const config = require('@/config')

module.exports = message => {
  if (config.DEBUG_MESSAGES) {
    console.log(message)
  }
}
