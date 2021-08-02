const { Model, DataTypes } = require('sequelize')

class WhitelistQuestion extends Model {
  static init(connection) {
    super.init({
      // guild_id: DataTypes.STRING(20),
      question: DataTypes.STRING(500)
      // não precisamos passar os campos "updated_at" nem "created_at" quando ele tem "timestamps: true" na config da DB
    }, { sequelize: connection })
  }

  static associate(models) {
    this.belongsTo(models.Guild, { foreignKey: 'guild_id', as: 'guild' })
  }
}

module.exports = WhitelistQuestion