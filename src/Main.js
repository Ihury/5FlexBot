const FiveFlexPro = require('./FiveFlexPro')

const client = new FiveFlexPro({
  disableMentions: 'everyone',
  ws: {
    intents: [
      'GUILDS',
      'GUILD_MESSAGES',
      'GUILD_INVITES',
      'GUILD_VOICE_STATES',
      'GUILD_MEMBERS',
      'GUILD_PRESENCES'
    ]
  }
})

require('discord-buttons')(client)

client.login(process.env.BOT_TOKEN)
