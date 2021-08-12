const { Model, DataTypes } = require('sequelize')

class GuildMySqlConfig extends Model {
  static init(connection) {
    super.init({
      // guild_id: DataTypes.STRING(20),
      host_ip: DataTypes.STRING(15),
      port: DataTypes.STRING(5),
      user: DataTypes.STRING(50),
      password: DataTypes.STRING(50),
      database_name: DataTypes.STRING(45),
      database_type: DataTypes.STRING(4)
      // não precisamos passar os campos "updated_at" nem "created_at" quando ele tem "timestamps: true" na config da DB
    }, { sequelize: connection })
  }

  static associate(models) {
    this.belongsTo(models.Guild, { foreignKey: 'id', as: 'guildID' })
  }
}

module.exports = GuildMySqlConfig