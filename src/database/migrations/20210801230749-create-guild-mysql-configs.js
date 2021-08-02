'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('guild_mysql_configs', {
      guild_id: {
        type: Sequelize.STRING(20),
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'guilds',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      host_ip: { //*
        type: Sequelize.STRING(15),
        allowNull: false
      },
      port: {
        type: Sequelize.STRING(5),
        allowNull: false
      },
      user: { //*
        type: Sequelize.STRING(50),
        allowNull: false
      },
      password: { //*
        type: Sequelize.STRING(50),
        allowNull: false
      },
      database_name: {
        type: Sequelize.STRING(45),
        allowNull: false
      },
      database_type: {
        type: Sequelize.STRING(3),
        allowNull: false
      },
      

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
    await queryInterface.dropTable('guild_mysql_configs')
  }
};
