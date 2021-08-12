const { Command } = require('../../Structures')
const { Embed, ErrorEmbed } = require('../../utils/Embeds')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'ping',
      description: 'Mostra o ping do BOT.'
    })
  }

  run = (interaction, t, language) => {
    interaction.reply({
      content: t('commands.general:ping', language, { ping: this.client.ws.ping })
    })
  }
}
