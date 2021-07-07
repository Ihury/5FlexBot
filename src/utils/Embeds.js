const { MessageEmbed } = require('discord.js')

class Embed extends MessageEmbed {
  constructor(message) {
    super()

    this
      .setAuthor(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
      .setFooter(message.guild.name, message.guild.iconURL({ dynamic: true }))
      .setTimestamp()
  }
}

class ErrorEmbed extends Embed {
  constructor(message) {
    super(message)

    this.setColor('RED')
  }
}

module.exports.Embed = Embed
module.exports.ErrorEmbed = ErrorEmbed
