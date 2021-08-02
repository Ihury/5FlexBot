const Sequelize = require('sequelize')
const config = require('../database/Config')
const Logger = require('../utils/Logger')
const { readdirSync } = require('fs')

// Criar uma conexão com a DB
const Connection = new Sequelize(config)

// Inicializar todos os Models da DB
function initAllModels(path = './src/database/models') {
  const modelFiles = readdirSync(path)

  for (const file of modelFiles) {
    const modelName = file.split('.')[0]

    try {
      require(`./models/${file}`).init(Connection)
    } catch(e) {
      Logger.log({ color: 'red', msg: '🎲' }, { color: 'red', msg: ` Erro ao carregar o model ${modelName}:\n      ↳ ${e.message}` })
    }
  }
}

// Associar todos os Models da DB entre si
function associateAllModels(path = './src/database/models') {
  const modelFiles = readdirSync(path)

  for (const file of modelFiles) {
    const modelName = file.split('.')[0]

    try {
      require(`./models/${file}`).associate?.(Connection.models)
    } catch(e) {
      Logger.log({ color: 'red', msg: '🎲' }, { color: 'red', msg: ` Erro ao carregar o model ${modelName}:\n      ↳ ${e.message}` })
    }
  }
}


initAllModels()
associateAllModels()

module.exports = Connection