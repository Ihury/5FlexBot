const { Event } = require('../../Structures')

module.exports = class extends Event {
  constructor (client) {
    super(client, {
      name: 'guildDelete'
    })
  }

  run = async(guild) => {
    if (this.client.databaseCache.guilds.find(g => g.id === guild.id))
      await this.client.database.guilds.destroy({ where: { id: guild.id } })
  }
}
