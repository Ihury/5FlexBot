class Command {
  constructor (client, options) {
    this.client = client
    this.name = options.name
    this.aliases = options.aliases || []
    this.cooldown = options.cooldown || 3
    this.ownersOnly = options.ownersOnly || false
    this.permissions = options.permissions || []
  }
}

module.exports = Command
