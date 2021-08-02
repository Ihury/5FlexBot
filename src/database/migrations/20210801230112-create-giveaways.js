'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('giveaways', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      guild_id: {
        type: Sequelize.STRING(20),
        allowNull: false,
        references: {
          model: 'guilds',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      creator_id: { //* (antigo "author")
        type: Sequelize.STRING(20),
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }/*,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'*/
      },
      message: Sequelize.STRING(200), //*
      role_id: Sequelize.STRING(20), //*
      winners: { //*
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      end_timestamp: Sequelize.BIGINT, //*
      

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
    await queryInterface.dropTable('giveaways')
  }
};
