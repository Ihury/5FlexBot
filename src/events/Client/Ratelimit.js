const { Event } = require('../../Structures')

class Ratelimit extends Event {
  constructor (client) {
    super(client, {
      name: 'ratelimit'
    })
  }

  run = (rate) => {
    this.client.logger.log({ color: 'red', msg: '🤖' }, { color: 'red', msg: ' BOT em Ratelimit, desligando por percaução...' })
    process.exit(0)
  }
}

module.exports = Ratelimit