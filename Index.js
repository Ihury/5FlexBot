const { ShardingManager } = require('discord.js')
const logger = require('./src/utils/Logger')

require('dotenv').config()

const manager = new ShardingManager('./src/Main.js', {
  token: process.env.BOT_TOKEN,
  respawn: false // Talvez seja útil deixarmos como true mais tarde, quem sabe... (Está como false devido ao evento ratelimit)
})

manager.on('shardCreate', shard => {
  logger.log({ color: 'cyan', msg: '💠' }, { color: 'cyan', msg: ` Shard ${shard.id} inicializado com sucesso!` })
})

manager.spawn()