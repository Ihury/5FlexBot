const { Client, MessageEmbed } = require('discord.js')
const { readdirSync } = require('fs')
const Translator = require('./utils/Translator')
const EnvParser = new (require('./utils/EnvParser'))()
const modelNames = require('./utils/modelNames')

class FiveFlexPro extends Client {
  constructor (options) {
    super(options)

    this.commands = []
    this.cooldowns = [] // { guildID: string, userID: string, cmd: string, timestamp: number }[]

    this.databaseConnection = require('./database/Connection')
    this.databaseModels = [] // { modelName: string, modelClass: class }

    this.database = {
      guilds: require('./database/models/Guild'),
      users: require('./database/models/User'),
      botStatuses: require('./database/models/BotStatus'),
      factions: require('./database/models/Faction'),
      giveaways: require('./database/models/Giveaway'),
      guildMySqlConfigs: require('./database/models/GuildMySqlConfig'),
      tickets: require('./database/models/Ticket'),
      vips: require('./database/models/Vip'),
      staffGroups: require('./database/models/StaffGroup'),
      usersCars: require('./database/models/UsersCar'),
      whitelists: require('./database/models/Whitelist'),
      whitelistQuestions: require('./database/models/WhitelistQuestion')
    }
    this.databaseCache = { // Armazenamento do banco de dados em cache (PESADO) 
      guilds: [],
      users: [],
      botStatuses: [],
      factions: [],
      giveaways: [],
      guildMySqlConfigs: [],
      tickets: [],
      vips: [],
      staffGroups: [],
      usersCars: [],
      whitelists: [],
      whitelistQuestions: []
    }

    this.logger = require('./utils/Logger.js')
    this.translator = new Translator(this)
    this.env = EnvParser.parseEnv()

    this.connectToDatabase()
    this.loadDatabaseModels()
    this.applyDatabaseModelsHooks()
    this.loadDatabaseDataIntoCache()
    this.loadCommands()
    this.loadEvents()
  }




  async connectToDatabase () {
    try {
      await this.databaseConnection.authenticate();
      this.logger.log({ color: 'green', msg: '🎲' }, { color: 'green', msg: ' Conexão com a DB estabelecida com sucesso' })
    } catch (e) {
      this.logger.log({ color: 'red', msg: '🎲' }, { color: 'red', msg: 'Erro ao estabelecer conexão com a DB:' })
      this.logger.log({ color: 'red', msg: '🎲' }, { color: 'red', msg: ` ↳ ${e.message}` })
    }
  }




  loadDatabaseModels() {
    const models = readdirSync('./src/database/models/')

    for (var i=0; i < models.length; i++)
      this.databaseModels.push({ modelName: models[i].split('.')[0], modelClass: require(`./database/models/${models[i]}`)})
  }




  applyDatabaseModelsHooks () {
    const models = readdirSync('./src/database/models/')

    for (var i=0; i < this.databaseModels.length; i++) {
      const { modelName, modelClass } = this.databaseModels[i]

      // Hook para adicionar os dados à cache quando algo é inserido/criado no banco de dados
      modelClass.afterCreate(async (model, options) => {
        const newData = await this.database[modelNames[modelName]].findByPk(model.dataValues.id)
        this.databaseCache[modelNames[modelName]].push(newData.dataValues)
      })

      // Hook para remover os dados da cache quando algo é apagado/deletado do banco de dados
      modelClass.afterBulkDestroy((query, options) => {
        this.databaseCache[modelNames[modelName]].splice(this.databaseCache[modelNames[modelName]].findIndex(d => d.id === query.where.id), 1)
      })

      // Hook para atualizar os dados da cache quando algo é atualizado no banco de dados
      modelClass.afterBulkUpdate((query, options) => {
        const { attributes } = query
        const entries = Object.entries(attributes)

        for (var i=0; i < entries.length; i++)
          this.databaseCache[modelNames[modelName]][this.databaseCache[modelNames[modelName]].findIndex(d => d?.id === query.where.id)][entries[i][0]] = entries[i][1]
      })
    }
  }




  async loadDatabaseDataIntoCache() {
    for (var i=0; i < this.databaseModels.length; i++) {
      const { modelName, modelClass } = this.databaseModels[i]

      const data = (await modelClass.findAll())

      if (data.length) this.databaseCache[modelNames[modelName]] = this.databaseCache[modelNames[modelName]].concat(data.map(d => d.dataValues))
    }
  }




  registerCommands (mode='guild') { // guild|production
    // Guild registry
    if (mode === 'guild') this.guilds.cache.get(process.env.TESTS_GUILD_ID).commands.set(this.commands)

    // Global registry
    else this.application.commands.set(this.commands)
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
        
          if (evt.once) this.once(evt.name, evt.run)
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
