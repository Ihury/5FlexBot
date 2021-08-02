const { Model, DataTypes } = require('sequelize')

class User extends Model {
  static init(connection) {
    super.init({
      // guild_id: DataTypes.STRING(20),
      xp: DataTypes.BIGINT,
      reputation_points: DataTypes.INTEGER,
      reputation_votes: DataTypes.INTEGER,
      vip: DataTypes.BOOLEAN,
      vip_id: DataTypes.INTEGER,
      vip_role: DataTypes.STRING(20),
      vip_end_timestamp: DataTypes.BIGINT
      // não precisamos passar os campos "updated_at" nem "created_at" quando ele tem "timestamps: true" na config da DB
    }, { sequelize: connection })
  }

  static associate(models) {
    this.belongsTo(models.Guild, { foreignKey: 'guild_id', as: 'guildID' })
    this.belongsToMany(models.UserCar, { foreignKey: 'owner_id', through: 'users_cars', as: 'cars' })
  }
}

module.exports = User