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

  run = (message, args, prefix) => {
    // Se o membro não providenciar nenhum argumento, mostra o prefixo atual...
    if (!args.length)
      return message.channel
        .send(new Embed(message).setDescription(`O prefixo atual é \`${prefix}\`.\nPara alterá-lo, utilize \`${prefix}prefixo <novo prefix>\`, sem as **<>**.`))
        .catch(()=>{})

    // ...senão pega no novo prefixo indicado e verifica se é válido para ser definido
    const newPrefix = args.join('')

    if (newPrefix.length > 5)
      return message.channel
        .send(new ErrorEmbed(message).setDescription('O prefixo não pode ter mais de 5 caracteres.'))
        .catch(()=>{})
    
    /*
      Nessa linha o novo prefixo será setado no banco de dados e na cache do bot
    */

    message.channel
      .send(new Embed(message).setDescription(`O prefixo foi alterado para \`${newPrefix}\` com sucesso.`))
      .catch(()=>{})
  }
}

module.exports = PrefixCommand
