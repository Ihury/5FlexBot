const EnvParser = new (require('../utils/EnvParser'))()
const env = EnvParser.parseEnv()
const Logger = require('../utils/Logger')

// Configuração para a conexão com a DB
module.exports = {
  dialect: 'mysql',
  host: env.DB_HOST || 'localhost',
  port: env.DB_PORT || '3306',
  username: env.DB_USER || 'root',
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  define: {
    timestamps: true,
    underscored: true
  },


  // Mostrar queries feitas (como a query feita no método <Connection>.authenticate())
  // logging: msg => Logger.log({ color: 'blue', msg: '🎲' }, { color: 'blue', msg: ` ${msg}` })
  
  logging: false // Evitar que queries feitas apareçam no terminal
}