const { Command } = require('../../Structures')
const { Embed, ErrorEmbed, SuccessEmbed, InfoEmbed } = require('../../utils/Embeds')
const { readdirSync } = require('fs')
const { MessageEmbed, Permissions } = require('discord.js')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'setup',
      description: 'Cria canais para as diferentes configurações do BOT.',
      /*options: [
        { name: 'categoria', type: 'CHANNEL', description: 'Categoria na qual serão criados os canais', required: true }
      ],*/
    })
  }

  run = async (interaction, t, language) => {
    const category = await interaction.guild.channels.create(t('commands.config:setup.channels:setupCategory', language), { position: interaction.guild.channels.cache.size+1 })

    interaction.guild.channels
    .create(
      t('commands.config:setup.channels:setupCategory', language),
      { permissionOverwrites: [{ id: interaction.guild.id, deny: [ Permissions.FLAGS.VIEW_CHANNEL ] }] }
    )
    .then(async channel => {
      const embed = new InfoEmbed()
        .setTitle(t('commands.config:setup.embed:title', language))
        .setDescription(t('commands.config:setup.embed:description', language))
        .setTimestamp()
    })
    .catch(() => {
      interaction.reply({
        content: t('commands.config:setup.channelCreationFailure', language),
        ephemeral: true
      })
    })
  }
}
