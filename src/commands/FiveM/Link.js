const { Command } = require('../../Structures')

const GuildDatabaseManager = require('../../utils/GuildDatabaseManager')

module.exports = class extends Command {
  constructor(client) {
    super(client, {
      name: 'vincular',
      description: 'Vincula o id de um usuário no Discord a um id no banco de dados do servidor.',
      options: [
        {
          name: 'usuário',
          type: 'USER',
          description: 'Discord do usuário.',
          required: true
        },
        {
          name: 'id',
          type: 'INTEGER',
          description: 'ID do usuário no FiveM.',
          required: true
        }
      ],
    })
  }

  run = async (interaction, t, language) => {
    const guildMySqlConfig = await this.client.database.guildMySqlConfigs.findByPk(interaction.guild.id)
    console.log(guildMySqlConfig)
  }
}
