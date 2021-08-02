const { Command } = require('../../Structures')
const { Embed, ErrorEmbed } = require('../../utils/Embeds')

class RegisterGuildCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'registerguild',
      aliases: [],
      permissions: ['MANAGE_GUILD']
    })
  }

  run = async (message, args, prefix, t, language) => {
    try {
      await this.client.database.guilds.create({
        id: message.guild.id,
      })
      
      this.client.sendMessage(message.channel, 'Servidor registrado com sucesso!')
    } catch(e) {
      console.log(e)
    }
  }
}

module.exports = RegisterGuildCommand
