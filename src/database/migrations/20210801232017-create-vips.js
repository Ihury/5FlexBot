'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('vips', {
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
      name: Sequelize.STRING(50),
      role_id: Sequelize.STRING(20), //*
      money_reward: Sequelize.BIGINT, //* (antigo "money_award")
      

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
    await queryInterface.dropTable('vips')
  }
};
