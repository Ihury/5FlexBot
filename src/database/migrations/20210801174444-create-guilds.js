'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('guilds', {
      id: {
        type: Sequelize.STRING(20),
        primaryKey: true,
        allowNull: false
      },
      premium: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      premium_end_timestamp: Sequelize.BIGINT,
      server_ip: Sequelize.STRING(15),
      server_port: Sequelize.STRING(4),
      server_representative_ip: Sequelize.STRING(50),
      backup_status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      backup_channel: Sequelize.STRING(20),
      fivem_command_logs: Sequelize.STRING(20), //*
      fivem_ban_logs: Sequelize.STRING(20),
      fivem_ban_role: Sequelize.STRING(20),
      ban_logs: Sequelize.STRING(20),
      adv_logs: Sequelize.STRING(20),
      adv_role_1: Sequelize.STRING(20),
      adv_role_2: Sequelize.STRING(20),
      bugs_channel: Sequelize.STRING(20),
      bugs_logs: Sequelize.STRING(20),
      suggestions_channel: Sequelize.STRING(20),
      suggestions_count: Sequelize.BIGINT, //*
      reports_category: Sequelize.STRING(20), //*
      reports_role: Sequelize.STRING(20), //*
      anti_invite_status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      anti_invite_ignore: Sequelize.STRING(105),
      anti_links_status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      anti_links_ignore: Sequelize.STRING(105),
      auto_ban_status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      auto_ban_logs: Sequelize.STRING(20),
      auto_wl_removal_channel: Sequelize.STRING(20),
      auto_wl_removal_logs: Sequelize.STRING(20),
      auto_kick_status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      auto_kick_logs: Sequelize.STRING(20),
      captcha_status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      captcha_channel: Sequelize.STRING(20),
      captcha_logs: Sequelize.STRING(20),
      wipe_logs: Sequelize.STRING(20),
      word_filter_status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      word_filter_channels: Sequelize.STRING(420),
      word_filter_words: Sequelize.STRING(2000),
      word_filter_logs: Sequelize.STRING(20),
      fivem_stats_status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      fivem_stats_channel: Sequelize.STRING(20),
      messages_illegal: Sequelize.STRING(20),
      messages_anonymous: Sequelize.STRING(20),
      messages_frp: Sequelize.STRING(20),
      messages_deepweb: Sequelize.STRING(20),
      tinder_status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      tinder_channel: Sequelize.STRING(20),
      olx_status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      olx_channel: Sequelize.STRING(20),
      beat_time_status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      welcome_status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      welcome_style: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      welcome_channel: Sequelize.STRING(20),
      welcome_image: Sequelize.STRING(200),
      leave_channel: Sequelize.STRING(20),
      auto_role_status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      auto_role_role: Sequelize.STRING(20),
      counter_status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      counter_message: Sequelize.STRING(100),
      counter_emoji_style: Sequelize.BIGINT(20), //*
      counter_channel: Sequelize.STRING(20),
      counter_voice_channel: Sequelize.STRING(20),
      counter_voice_message: Sequelize.STRING(50),
      vip_announcements: Sequelize.STRING(20),
      recomendation_logs: Sequelize.STRING(20),
      faction_logs: Sequelize.STRING(20),
      rank_status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      rankup_channel: Sequelize.STRING(20), //*
      indication_status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      indication_logs: Sequelize.STRING(20),
      actions_channel: Sequelize.STRING(20),
      actions_pending: Sequelize.STRING(20),
      actions_logs: Sequelize.STRING(20),
      actions_count: Sequelize.BIGINT, //*
      vip_reward_status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      vip_reward_channel: Sequelize.STRING(20),
      vip_reward_category: Sequelize.STRING(20),
      vip_reward_logs: Sequelize.STRING(20),
      ticket_channel: Sequelize.STRING(20),
      ticket_logs: Sequelize.STRING(20),
      discord_logs_status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      discord_logs_channel: Sequelize.STRING(20),


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
    await queryInterface.dropTable('guilds')
  }
};
