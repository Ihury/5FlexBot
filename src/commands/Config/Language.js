const { Command } = require('../../Structures')
const { Embed, ErrorEmbed, SuccessEmbed, InfoEmbed } = require('../../utils/Embeds')
const { readdirSync } = require('fs')
const { MessageEmbed } = require('discord.js')

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
          choices: readdirSync('./src/translations').map(t => {
            const [language] = t.split('.')
            return { name: language, value: language } 
          })
        }
      ],
    })
  }

  run = (interaction, t, language) => {
    // Pegar no idioma que o usuário introduziu, se introduziu algum
    const inputLanguage = interaction.options.getString('novo_idioma')

    // Se o membro não providenciar nenhum idioma, mostra o idioma atual...
    if (!inputLanguage)
      return interaction.reply({
        embeds: [ new InfoEmbed().setDescription(t('commands.config:language.currentLanguage', language, { currentLanguage: language.toUpperCase() })) ],
        ephemeral: true
      })

    // Atualiza o idioma no banco de dados
    this.client.database.guilds.update({ language: inputLanguage }, {
      where: {
        id: interaction.guildId
      }
    })
    .then(() => {
      interaction.reply({
        embeds: [ new SuccessEmbed().setDescription(t('commands.config:language.languageChanged', inputLanguage, { updatedLanguage: inputLanguage.toUpperCase() })) ],
        ephemeral: true
      })
    })
  }
}
