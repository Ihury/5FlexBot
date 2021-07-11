const { Client, MessageEmbed } = require('discord.js')
const { readdirSync } = require('fs')
const Translator = require('./utils/Translator')
const EnvParser = new (require('./utils/EnvParser'))()

class FiveFlexPro extends Client {
  constructor (options) {
    super(options)

    this.commands = []
    this.cooldowns = [] // { guildID: string, userID: string, cmd: string, timestamp: number }[]

    this.logger = require('./utils/Logger.js')
    this.translator = new Translator(this)
    this.env = EnvParser.parseEnv()

    // Discord Utilities
    this.sendMessage = (channel, content, options) => channel.send(content, options).catch(()=>{})

    this.cachedDB = {} // Armazenamento do banco de dados em cache

    this.loadCommands()
    this.loadEvents()
  }




  loadCommands (path = './src/commands') {
    const categories = readdirSync(path)

    for (const category of categories) {
      const commands = readdirSync(`${path}/${category}/`).filter(d => d.endsWith('.js'))

      let failed = 0
      for (const command of commands) {
        try {
          const cmd = new (require(`../${path}/${category}/${command}`))(this)
          this.commands.push(cmd)
        } catch(e) {
          failed++
          this.logger.log({ color: 'red', msg: '🔴' }, { color: 'red', msg: ` Erro ao carregar o comando ${command} da categoria ${category}` })
        }
      }

      const total = commands.length
      const OK = (total !== failed && !!commands.length)
      const color = OK ? 'green' : 'yellow'

      this.logger.log({ color, msg: OK ? '🟢' : '🟡' }, { color, msg: OK ? `${total-failed}/${total} Comando(s) de ${category} carregados` : `Nenhum comando de ${category} por carregar` })
    }
  }




  loadEvents (path = './src/events') {
    const categories = readdirSync(path)

    for (const category of categories) {
      const events = readdirSync(`${path}/${category}/`).filter(d => d.endsWith('.js'))

      let failed = 0
      for (const event of events) {
        try {
          const evt = new (require(`../${path}/${category}/${event}`))(this)
        
          if (evt.name === 'ready') this.once(evt.name, evt.run)
          else this.on(evt.name, evt.run)
        } catch(e) {
          failed++
          this.logger.log({ color: 'red', msg: '🔴' }, { color: 'red', msg: ` Erro ao carregar o evento ${event} da categoria ${category}` })
        }
      }

      const total = events.length
      const OK = (total !== failed && !!events.length)
      const color = OK ? 'green' : 'yellow'

      this.logger.log({ color, msg: OK ? '🟢' : '🟡' }, { color, msg: OK ? `${total-failed}/${total} Evento(s) de ${category} carregados` : `Nenhum evento de ${category} por carregar` })
    }
  }
}

module.exports = FiveFlexPro
