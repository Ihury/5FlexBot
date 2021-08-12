const { MessageEmbed } = require('discord.js')

class Embed extends MessageEmbed {
  constructor(interaction) {
    super()

    this
      .setAuthor(interaction.member.displayName, interaction.user.displayAvatarURL({ dynamic: true }))
      .setFooter(interaction.guild.name, interaction.guild.iconURL({ dynamic: true }))
      .setTimestamp()
  }
}

class ErrorEmbed extends Embed {
  constructor(interaction) {
    super(interaction)

    this.setColor('RED')
  }
}

module.exports.Embed = Embed
module.exports.ErrorEmbed = ErrorEmbed
