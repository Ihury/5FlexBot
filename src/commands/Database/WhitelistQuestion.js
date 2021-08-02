const { Command } = require('../../Structures')
const { Embed, ErrorEmbed } = require('../../utils/Embeds')

class WhitelistQuestionCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'wlquestion',
      aliases: [],
      permissions: ['MANAGE_GUILD']
    })
  }

  run = async (message, args, prefix, t, language) => {
    try {
      await this.client.database.whitelistQuestions.create({
        guild_id: message.guild.id,
        question: 'Quanto é 1+1?'
      })
      
      this.client.sendMessage(message.channel, 'Pergunta criada com sucesso!')
    } catch(e) {
      console.log(e)
    }
  }
}

module.exports = WhitelistQuestionCommand
