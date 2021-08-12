const FiveFlexPro = require('./FiveFlexPro')

const client = new FiveFlexPro({
  intents: [
    'GUILDS',
    'GUILD_MESSAGES',
    'GUILD_INVITES',
    'GUILD_VOICE_STATES',
    'GUILD_MEMBERS',
    'GUILD_PRESENCES'
  ]
})

client.login(process.env.BOT_TOKEN)
