const { Model, DataTypes } = require('sequelize')

class Giveaway extends Model {
  static init(connection) {
    super.init({
      // não precisamos passar o campo "id" quando ele tem "autoIncrement: true" na migration
      // guild_id: DataTypes.STRING(20),
      creator_id: DataTypes.STRING(20),
      message: DataTypes.STRING(200),
      role_id: DataTypes.STRING(20),
      winners: DataTypes.INTEGER,
      end_timestamp: DataTypes.BIGINT
      // não precisamos passar os campos "updated_at" nem "created_at" quando ele tem "timestamps: true" na config da DB
    }, { sequelize: connection })
  }

  static associate(models) {
    this.belongsTo(models.Guild, { foreignKey: 'guild_id', as: 'guild' })
  }
}

module.exports = Giveaway