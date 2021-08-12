const { MessageEmbed } = require('discord.js')

class SuccessEmbed extends MessageEmbed {
  constructor() {
    super()

    this.setColor('#77B255')

    // this
      // .setAuthor(interaction.member.displayName, interaction.user.displayAvatarURL({ dynamic: true }))
      // .setFooter(interaction.guild.name, interaction.guild.iconURL({ dynamic: true }))
      // .setTimestamp()
  }
}

class InfoEmbed extends MessageEmbed {
  constructor() {
    super()

    this.setColor('#3B88C3')
  }
}

class ErrorEmbed extends MessageEmbed {
  constructor() {
    super()

    this.setColor('#DD2E44')
  }
}

module.exports.SuccessEmbed = SuccessEmbed
module.exports.InfoEmbed = InfoEmbed
module.exports.ErrorEmbed = ErrorEmbed
