class Command {
  constructor (client, options) {
    this.client = client
    this.name = options.name
    this.aliases = options.aliases || []
    this.cooldown = options.cooldown || 3
    this.ownerOnly = options.ownerOnly || false
    this.permissions = options.permissions || []
  }
}

module.exports = Command
