const { Command } = require('../../Structures')
const { Embed, ErrorEmbed } = require('../../utils/Embeds')
const { readdirSync } = require('fs')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'idioma',
      description: 'Mostra ou define o idioma das respostas do BOT.',
      options: [
        { 
          name: 'novo_idioma', 
          type: 'STRING', 
          description: 'Novo idioma a definir.', 
          required: false,
          choices: [
            {
              name: 'pt',
              value: 'pt'
            },
            {
              name: 'en',
              value: 'en'
            }
          ]
        }
      ],
    })
  }

  run = (interaction, t, language) => {
    // Objeto para "formatar" o idioma para texto
    const validLanguagesObject = {
      'pt': 'português',
      'en': 'english'
    }

    // Pegar no idioma que o usuário introduziu, se introduziu algum
    const inputLanguage = interaction.options.getString('novo_idioma')

    // Se o membro não providenciar nenhum idioma, mostra o idioma atual...
    if (!inputLanguage)
      return interaction.reply({ embeds: [
        new Embed(interaction)
          .setDescription(t('commands.config:language.currentLanguage', language, { currentLanguage: validLanguagesObject[language] }))
      ] })

    // ...senão pega no novo idioma indicado e verifica se é válido para ser definido
    const validLanguages = readdirSync('./src/translations').map(t => t.split('.')[0])

    // Verificar se o membro providenciou um idioma válido
    if (!validLanguages.includes(inputLanguage))
      return interaction.reply({ embeds: [
        new ErrorEmbed(interaction)
          .setDescription(t('commands.config:language.invalidLanguage', language, { mappedValidLanguages: validLanguages.map(l => `\`${l}\``).join(', ') }))
      ] })

    this.client.database.guilds.update({ language: inputLanguage }, {
      where: {
        id: interaction.guildId
      }
    })
    .then(() => {
      interaction.reply({ embeds: [
        new Embed(interaction)
          .setDescription(t('commands.config:language.languageChanged', inputLanguage, { updatedLanguage: validLanguagesObject[inputLanguage] }))
      ] })
    })
  }
}
