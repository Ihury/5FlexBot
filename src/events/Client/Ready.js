const { Event } = require('../../Structures')

module.exports = class extends Event {
  constructor (client) {
    super(client, {
      name: 'ready'
    })
  }

  run = async() => {
    this.client.logger.log({ color: 'green', msg: '🤖' }, { color: 'green', msg: ` ${this.client.user.tag} conectado em ${this.client.guilds.cache.size} servidor(es)` })

    this.client.registerCommands()
    this.loadUncaughtGuilds()
  }




  loadUncaughtGuilds() {
    const promises = [
        this.client.shard.broadcastEval(client => client.guilds.cache)
    ]

    const guilds = []

    Promise.all(promises).then(async results => {
      const allGuilds = results[0].flat()//.reduce((acc, curr) => acc.push(curr), guilds)

      for (var i=0; i < allGuilds.length; i++) {
        const guild = allGuilds[i]

        if (!this.client.databaseCache.guilds.find(g => g.id === guild.id))
          await this.client.database.guilds.create({ id: guild.id })
      }
    })
  }
}
