'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('whitelists', {
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
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      type: Sequelize.INTEGER,
      results_logs: Sequelize.STRING(20),
      auto_approvation: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      minimum_hits: Sequelize.INTEGER,
      category: Sequelize.STRING(20),
      change_nickname: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      nickname_model: Sequelize.STRING(32),
      

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
    await queryInterface.dropTable('whitelists')
  }
};
