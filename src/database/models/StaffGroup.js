const { Model, DataTypes } = require('sequelize')

class StaffGroup extends Model {
  static init(connection) {
    super.init({
      // guild_id: DataTypes.STRING(20),
      name: DataTypes.STRING(50),
      role_id: DataTypes.STRING(20),
      points: DataTypes.INTEGER,
      votes: DataTypes.INTEGER
      // não precisamos passar os campos "updated_at" nem "created_at" quando ele tem "timestamps: true" na config da DB
    }, { sequelize: connection })
  }

  static associate(models) {
    this.belongsTo(models.Guild, { foreignKey: 'guild_id', as: 'guildID' })
  }
}

module.exports = StaffGroup