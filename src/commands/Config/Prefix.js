const { Command } = require('../../Structures')
const { Embed, ErrorEmbed } = require('../../utils/Embeds')

class PrefixCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'prefixo',
      aliases: ['prefix'],
      permissions: ['MANAGE_GUILD']
    })
  }

  run = (message, args, prefix, t, language) => {
    // Se o membro não providenciar nenhum argumento, mostra o prefixo atual...
    if (!args.length)
      return this.client.sendMessage(message.channel, new Embed(message).setDescription(t('commands.config:prefix.currentPrefix', language, { prefix, args })))

    // ...senão pega no novo prefixo indicado e verifica se é válido para ser definido
    const newPrefix = args.join('')

    if (newPrefix.length > 5)
      return this.client.sendMessage(message.channel, new ErrorEmbed(message).setDescription(t('commands.config:prefix.invalidPrefix', language)))
    
    /*
      Nessa linha o novo prefixo será setado no banco de dados e na cache do bot
    */

    this.client.sendMessage(message.channel, new Embed(message).setDescription(t('commands.config:prefix.prefixChanged', language, { newPrefix })))
  }
}

module.exports = PrefixCommand
