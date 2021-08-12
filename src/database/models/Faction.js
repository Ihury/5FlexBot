const { Model, DataTypes } = require('sequelize')

class Faction extends Model {
  static init(connection) {
    super.init({
      // não precisamos passar o campo "id" quando ele tem "autoIncrement: true" na migration
      // guild_id: DataTypes.STRING(20),
      name: DataTypes.STRING(50),
      role_id: DataTypes.STRING(20),
      leader_id: DataTypes.STRING(20),
      leader_role_id: DataTypes.STRING(20)
      // não precisamos passar os campos "updated_at" nem "created_at" quando ele tem "timestamps: true" na config da DB
    }, { sequelize: connection })
  }

  static associate = (models) => {
    this.belongsTo(models.Guild, { foreignKey: 'id', as: 'guild' })
  }
}

module.exports = Faction