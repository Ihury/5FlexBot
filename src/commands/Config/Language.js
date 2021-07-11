const { Command } = require('../../Structures')
const { Embed, ErrorEmbed } = require('../../utils/Embeds')

class LanguageCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'idioma',
      aliases: ['language'],
      permissions: ['MANAGE_GUILD']
    })
  }

  run = (message, args, prefix, t, language) => {
    // Objeto para "formatar" o idioma para texto
    const validLanguagesObject = {
      'pt': 'português',
      'en': 'inglês'
    }

    // Se o membro não providenciar nenhum argumento, mostra o idioma atual...
    if (!args.length)
      return this.client.sendMessage(message.channel, new Embed(message).setDescription(t('commands.config:language.currentLanguage', language, { currentLanguage: validLanguagesObject[language], prefix })))

    // ...senão pega no novo idioma indicado e verifica se é válido para ser definido
    const newLanguage = args[0]

    // Temporário. Os idiomas válidos serão armazenados na db ou definidos mais tarde no código (por pensar)
    const validLanguages = ['pt', 'en']

    // Verificar se o membro providenciou um idioma válido
    if (!validLanguages.includes(newLanguage))
      return this.client.sendMessage(message.channel, new ErrorEmbed(message).setDescription(t('commands.config:language.invalidLanguage', language, { mappedValidLanguages: validLanguages.map(l => `\`${l}\``).join(', ') })))
    
    /*
      Nessa linha o novo idioma será setado no banco de dados e na cache do bot
    */

    this.client.sendMessage(message.channel, new Embed(message).setDescription(t('commands.config:language.changedLanguage', language, { updatedLanguage: validLanguagesObject[newLanguage] })))
  }
}

module.exports = LanguageCommand
