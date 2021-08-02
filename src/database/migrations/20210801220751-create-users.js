'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.STRING(20),
        primaryKey: true,
        allowNull: false
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
      xp: Sequelize.BIGINT,
      reputation_points: Sequelize.INTEGER,
      reputation_votes: Sequelize.INTEGER,
      vip: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      vip_id: Sequelize.INTEGER,
      vip_role: Sequelize.STRING(20),
      vip_end_timestamp: Sequelize.BIGINT, //*
      

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
    await queryInterface.dropTable('users')
  }
};
