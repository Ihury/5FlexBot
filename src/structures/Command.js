module.exports = class {
  constructor (client, options) {
    this.client = client

    this.name = options.name
    this.description = options.description
    this.options = options.options || []

    this.cooldown = options.cooldown || 3
    this.ownersOnly = options.ownersOnly || false
    this.permissions = options.permissions || []
  }
}
