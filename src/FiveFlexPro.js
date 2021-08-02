const { Client, MessageEmbed } = require('discord.js')
const { readdirSync } = require('fs')
const Translator = require('./utils/Translator')
const EnvParser = new (require('./utils/EnvParser'))()

class FiveFlexPro extends Client {
  constructor (options) {
    super(options)

    this.commands = []
    this.cooldowns = [] // { guildID: string, userID: string, cmd: string, timestamp: number }[]

    this.database = {
      guilds: require('./database/models/Guild'),
      users: require('./database/models/User'),
      botStatuses: require('./database/models/BotStatus'),
      factions: require('./database/models/Faction'),
      giveaways: require('./database/models/Giveaway'),
      guildMySQLConfigs: require('./database/models/GuildMySQLConfig'),
      tickets: require('./database/models/Ticket'),
      vips: require('./database/models/Vip'),
      staffGroups: require('./database/models/StaffGroup'),
      userCars: require('./database/models/UserCar'),
      whitelists: require('./database/models/Whitelist'),
      whitelistQuestions: require('./database/models/WhitelistQuestion')
    }
    this.databaseCache = {} // Armazenamento do banco de dados em cache (PESADO)

    this.logger = require('./utils/Logger.js')
    this.translator = new Translator(this)
    this.env = EnvParser.parseEnv()

    // Discord Utilities
    this.sendMessage = (channel, content, options) => channel.send(content, options).catch(()=>{})

    this.connectToDatabase()
    this.loadCommands()
    this.loadEvents()
  }




  static logger = () => {
    return this.logger
  }




  async connectToDatabase () {
    const Connection = require('./database/Connection')

    try {
      await Connection.authenticate();
      this.logger.log({ color: 'green', msg: '🎲' }, { color: 'green', msg: ' Conexão com a DB estabelecida com sucesso' })
    } catch (e) {
      this.logger.log({ color: 'red', msg: '🎲' }, { color: 'red', msg: 'Erro ao estabelecer conexão com a DB:' })
      this.logger.log({ color: 'red', msg: '🎲' }, { color: 'red', msg: ` ↳ ${e.message}` })
    }
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

      this.logger.log({ color, msg: OK ? '🟢' : '🟡' }, { color, msg: OK ? `${total-failed}/${total} Comando(s) de ${category} carregados` : `Nenhum comando de ${category} carregado` })
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

      this.logger.log({ color, msg: OK ? '🟢' : '🟡' }, { color, msg: OK ? `${total-failed}/${total} Evento(s) de ${category} carregados` : `Nenhum evento de ${category} carregado` })
    }
  }
}

module.exports = FiveFlexPro
