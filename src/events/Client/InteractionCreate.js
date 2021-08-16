const { Event } = require("../../Structures")

module.exports = class extends Event {
  constructor(client) {
    super(client, {
      name: 'interactionCreate'
    })
  }

  run = async (interaction) => {
    interaction.guildDB = await this.client.database.guilds.findByPk(interaction.guildId)
    const language = interaction.guildDB?.language

    // Se o usuário executar um comando (slash command)
    if (interaction.isCommand())
      this.client.commands.find(c => c.name === interaction.commandName)?.run(interaction, this.client.translator.translate, language)
  }
}