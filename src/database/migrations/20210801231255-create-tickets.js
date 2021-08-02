'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tickets', {
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
      creator_id: {
        type: Sequelize.STRING(20),
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      title: Sequelize.STRING(50), //* (antigo "name")
      description: Sequelize.STRING(500),
      category: Sequelize.STRING(20),
      status: { //*
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      roles: Sequelize.STRING(105),
      // não é necessário adicionar o campo "counter", porque o id do ticket já tem autoIncrement como "true"
      

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
    await queryInterface.dropTable('tickets')
  }
};
