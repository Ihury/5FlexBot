const { Model, DataTypes } = require('sequelize')

class Whitelist extends Model {
  static init(connection) {
    super.init({
      // guild_id: DataTypes.STRING(20),
      status: DataTypes.BOOLEAN,
      type: DataTypes.INTEGER,
      results_logs: DataTypes.STRING(20),
      auto_approvation: DataTypes.BOOLEAN,
      minimum_hits: DataTypes.INTEGER,
      category: DataTypes.STRING(20),
      change_nickname: DataTypes.BOOLEAN,
      nickname_model: DataTypes.STRING(32)
      // não precisamos passar os campos "updated_at" nem "created_at" quando ele tem "timestamps: true" na config da DB
    }, { sequelize: connection })
  }

  // static associate(models) {
  //   this.belongsTo(models.Guild, { foreignKey: 'id', as: 'guild' })
  // }
}

module.exports = Whitelist