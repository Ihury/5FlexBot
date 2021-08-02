const { Model, DataTypes } = require('sequelize')

class Ticket extends Model {
  static init(connection) {
    super.init({
      // guild_id: DataTypes.STRING(20),
      creator_id: DataTypes.STRING(20),
      title: DataTypes.STRING(50),
      description: DataTypes.STRING(500),
      category: DataTypes.STRING(20),
      status: DataTypes.BOOLEAN,
      roles: DataTypes.STRING(105)
      // não precisamos passar os campos "updated_at" nem "created_at" quando ele tem "timestamps: true" na config da DB
    }, { sequelize: connection })
  }

  static associate(models) {
    this.belongsTo(models.Guild, { foreignKey: 'guild_id', as: 'guild' })
  }
}

module.exports = Ticket