'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users_cars', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      owner_id: { //* (antigo "user_id")
        type: Sequelize.STRING(20),
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      guild_id: {
        type: Sequelize.STRING(20),
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'guilds',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      name: Sequelize.STRING(45), //* (antigo "car_name")
      sign: Sequelize.STRING(45), //* (antigo "car_sign")
      

      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users_cars')
  }
};
