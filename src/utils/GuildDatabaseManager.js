const mysql = require('mysql2')

class GuildDatabaseManager {
  constructor(options) {
    this.ip = options.host_ip
    this.user = options.user
    this.port = options.port
    this.password = options.password
    this.database = options.database_name
    this.databaseType = options.database_type
    this.language = language
  }

  async connect() {
    if (!this.ip) throw ('databaseNotConfigured')

    const databasePool = mysql.createPool({
      host: this.ip,
      user: this.user,
      port: this.port,
      password: this.password,
      database: this.database,
      multipleStatements: true,
    })

    return (
      await databasePool
        .promise()
        .query('SELECT version();')
        .then(() => {
          this.connection = databasePool
          return databasePool
        })
        .catch((err) => {
          throw err
        })
    )
  }
}

module.exports = GuildDatabaseManager