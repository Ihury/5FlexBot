const { Model, DataTypes } = require('sequelize')

class BotStatus extends Model {
  static init(connection) {
    super.init({
      type: DataTypes.STRING(20),
      text: DataTypes.STRING(100),
      time: DataTypes.BIGINT,
      url: DataTypes.STRING(200)
      // não precisamos passar os campos "updated_at" nem "created_at" quando ele tem "timestamps: true" na config da DB
    }, { sequelize: connection })
  }
}

module.exports = BotStatus