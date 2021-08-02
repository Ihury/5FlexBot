const { Model, DataTypes } = require('sequelize')

class UserCar extends Model {
  static init(connection) {
    super.init({
      // owner_id: DataTypes.STRING(20),
      // guild_id: DataTypes.STRING(20),
      name: DataTypes.STRING(45),
      sign: DataTypes.STRING(45),
      // não precisamos passar os campos "updated_at" nem "created_at" quando ele tem "timestamps: true" na config da DB
    }, { sequelize: connection })
  }

  static associate(models) {
    this.belongsTo(models.Guild, { foreignKey: 'guild_id', as: 'guild' })
    this.belongsToMany(models.User, { foreignKey: 'id', through: 'users_cars', as: 'users' })
  }
}

module.exports = UserCar