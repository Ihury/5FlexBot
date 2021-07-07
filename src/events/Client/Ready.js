const { Event } = require('../../Structures')

class Ready extends Event {
  constructor (client) {
    super(client, {
      name: 'ready'
    })
  }

  run = async() => {
    this.client.logger.log({ color: 'green', msg: '🤖' }, { color: 'green', msg: ` ${this.client.user.tag} conectado em ${this.client.guilds.cache.size} servidor(es)` })
  }
}

module.exports = Ready
