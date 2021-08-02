const { Model, DataTypes } = require('sequelize')

class Guild extends Model {
  static init(connection) {
    super.init({
      premium: DataTypes.BOOLEAN,
      premium_end_timestamp: DataTypes.BIGINT,
      server_ip: DataTypes.STRING(15),
      server_port: DataTypes.STRING(4),
      server_representative_ip: DataTypes.STRING(50),
      backup_status: DataTypes.BOOLEAN,
      backup_channel: DataTypes.STRING(20),
      fivem_command_logs: DataTypes.STRING(20),
      fivem_ban_logs: DataTypes.STRING(20),
      fivem_ban_role: DataTypes.STRING(20),
      ban_logs: DataTypes.STRING(20),
      adv_logs: DataTypes.STRING(20),
      adv_role_1: DataTypes.STRING(20),
      adv_role_2: DataTypes.STRING(20),
      bugs_channel: DataTypes.STRING(20),
      bugs_logs: DataTypes.STRING(20),
      suggestions_channel: DataTypes.STRING(20),
      suggestions_count: DataTypes.BIGINT,
      reports_category: DataTypes.STRING(20),
      reports_role: DataTypes.STRING(20),
      anti_invite_status: DataTypes.BOOLEAN,
      anti_invite_ignore: DataTypes.STRING(105),
      anti_links_status: DataTypes.BOOLEAN,
      anti_links_ignore: DataTypes.STRING(105),
      auto_ban_status: DataTypes.BOOLEAN,
      auto_ban_logs: DataTypes.STRING(20),
      auto_wl_removal_channel: DataTypes.STRING(20),
      auto_wl_removal_logs: DataTypes.STRING(20),
      auto_kick_status: DataTypes.BOOLEAN,
      auto_kick_logs: DataTypes.STRING(20),
      captcha_status: DataTypes.BOOLEAN,
      captcha_channel: DataTypes.STRING(20),
      captcha_logs: DataTypes.STRING(20),
      wipe_logs: DataTypes.STRING(20),
      word_filter_status: DataTypes.BOOLEAN,
      word_filter_channels: DataTypes.STRING(420),
      word_filter_words: DataTypes.STRING(2000),
      word_filter_logs: DataTypes.STRING(20),
      fivem_stats_status: DataTypes.BOOLEAN,
      fivem_stats_channel: DataTypes.STRING(20),
      messages_illegal: DataTypes.STRING(20),
      messages_anonymous: DataTypes.STRING(20),
      messages_frp: DataTypes.STRING(20),
      messages_deepweb: DataTypes.STRING(20),
      tinder_status: DataTypes.BOOLEAN,
      tinder_channel: DataTypes.STRING(20),
      olx_status: DataTypes.BOOLEAN,
      olx_channel: DataTypes.STRING(20),
      beat_time_status: DataTypes.BOOLEAN,
      welcome_status: DataTypes.BOOLEAN,
      welcome_style: DataTypes.INTEGER,
      welcome_channel: DataTypes.STRING(20),
      welcome_image: DataTypes.STRING(200),
      leave_channel: DataTypes.STRING(20),
      auto_role_status: DataTypes.BOOLEAN,
      auto_role_role: DataTypes.STRING(20),
      counter_status: DataTypes.BOOLEAN,
      counter_message: DataTypes.STRING(100),
      counter_emoji_style: DataTypes.BIGINT(20),
      counter_channel: DataTypes.STRING(20),
      counter_voice_channel: DataTypes.STRING(20),
      counter_voice_message: DataTypes.STRING(50),
      vip_announcements: DataTypes.STRING(20),
      recomendation_logs: DataTypes.STRING(20),
      faction_logs: DataTypes.STRING(20),
      rank_status: DataTypes.BOOLEAN,
      rankup_channel: DataTypes.STRING(20),
      indication_status: DataTypes.BOOLEAN,
      indication_logs: DataTypes.STRING(20),
      actions_channel: DataTypes.STRING(20),
      actions_pending: DataTypes.STRING(20),
      actions_logs: DataTypes.STRING(20),
      actions_count: DataTypes.BIGINT,
      vip_reward_status: DataTypes.BOOLEAN,
      vip_reward_channel: DataTypes.STRING(20),
      vip_reward_category: DataTypes.STRING(20),
      vip_reward_logs: DataTypes.STRING(20),
      ticket_channel: DataTypes.STRING(20),
      ticket_logs: DataTypes.STRING(20),
      discord_logs_status: DataTypes.BOOLEAN,
      discord_logs_channel: DataTypes.STRING(20)
      // não precisamos passar os campos "updated_at" nem "created_at" quando ele tem "timestamps: true" na config da DB
    }, { sequelize: connection })
  }

  static associate(models) {
    this.hasOne(models.GuildMySQLConfig, { foreignKey: 'guild_id', as: 'guildMySQLConfig' })
    this.hasOne(models.Whitelist, { foreignKey: 'guild_id', as: 'guildWhitelist' })
    this.hasOne(models.StaffGroup, { foreignKey: 'guild_id', as: 'guildStaffGroup' })

    this.hasMany(models.Ticket, { foreignKey: 'guild_id', as: 'guildTickets' })
    this.hasMany(models.User, { foreignKey: 'guild_id', as: 'guildUsers' })
    this.hasMany(models.WhitelistQuestion, { foreignKey: 'guild_id', as: 'guildWhitelistQuestions' })
    this.hasMany(models.UserCar, { foreignKey: 'guild_id', as: 'guildUserCars' })
    this.hasMany(models.Faction, { foreignKey: 'guild_id', as: 'guildFactions' })
    this.hasMany(models.Giveaway, { foreignKey: 'guild_id', as: 'guildGiveaways' })
    this.hasMany(models.Vip, { foreignKey: 'guild_id', as: 'guildVips' })
  }
}

module.exports = Guild