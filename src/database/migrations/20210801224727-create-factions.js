'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('factions', {
      id: { //*
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
      name: { //*
        type: Sequelize.STRING(50),
        allowNull: false
      },
      role_id: { //*
        type: Sequelize.STRING(20),
        allowNull: false
      },
      leader_id: { //*
        type: Sequelize.STRING(20),
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      leader_role_id: { //*
        type: Sequelize.STRING(20),
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
    await queryInterface.dropTable('factions')
  }
};
