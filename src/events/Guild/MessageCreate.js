/*











ESTE EVENTO NÃO SERÁ MAIS UTILIZADO, EM PRINCÍPIO, A NÃO SER PARA ALGUM SISTEMA DE LEVELS E XP, POR EXEMPLO











*/

const { MessageEmbed } = require('discord.js')
const { Event } = require('../../Structures')
const { ErrorEmbed } = require('../../utils/Embeds')

module.exports = class extends Event {
  constructor (client) {
    super(client, {
      name: 'messageCreate'
    })
  }

  run = async (message) => {
    // Se o autor da mensagem for um bot ou o canal do comando não for de texto, ignora
    if (message.author.bot || message.channel.type !== 'text') return

    // Temporariamente desconsiderado, uma vez que não existe ligação à DB ainda para poder pegar o prefixo
    // const prefix = /* prefixo pegado da cache da DB para o servidor onde o comando foi executado */ || process.env.BOT_PREFIX
    const prefix = process.env.BOT_PREFIX

    // Temporário. O idioma será pego da db
    const language = 'pt'

    const t = this.client.translator.translate
    
    /*

      Aqui ficará código que não precise que a mensagem do membro seja um comando

    */

    // Se a mensagem do membro não for um comando, ignora
    if (!message.content.startsWith(prefix)) return

    // Pegar o comando e os argumentos digitados pelo usuário:    (prefixo)(comando) (...argumentos...)
    const args = message.content.slice(prefix.length).split(/ +/g)
    const cmd = args.shift().toLowerCase()
    const command = this.client.commands.find(c => c.name === cmd) || this.client.commands.find(c => c.aliases.includes(cmd))

    // Se o comando for encontrado...
    if (command) {
      // Verificar se o comando é restrito apenas para donos do BOT
      // Se for e o membro não for um dono do BOT, o comando não é executado
      if (command.ownersOnly && !this.client.env.OWNERS_IDS.some(id => id === message.member.id)) return

      // Verificar se o comando tem um cooldown definido
      if (command.cooldown) {
        const cooldown = this.client.cooldowns.find(c => c.guildID === message.guild.id && c.userID === message.author.id && c.cmd === command.name)

        // Verificar se o membro está em cooldown do comando
        if (cooldown) {
          const now = Date.now()
          const expiresIn = cooldown.timestamp + command.cooldown

          if (now > expiresIn) {
            const timeLeft = (command.cooldown - (now - expiresIn)/1000).toFixed(1)

            const msg = await this.client.sendMessage(message.channel, new ErrorEmbed(message).setDescription(t('events.guild:message.cooldown', language, { timeLeft })))
            msg.delete({ timeout: timeLeft*1000 })
            return
          }
        }

        // Se não estiver em cooldown, passa a estar
        this.client.cooldowns.push({ guildID: message.guild.id, userID: message.author.id, cmd: command.name, timestamp: Date.now() })
        setTimeout(() => this.client.cooldowns.splice(this.client.cooldowns.findIndex(c => c.guildID === message.guild.id && c.userID === message.author.id), 1), command.cooldown*1000)
      }

      // Verificar se o comando requer alguma permissão e se o membro as tem a todas
      if (command.permissions.length > 0)
        if (!command.permissions.every(p => message.member.permissions.has(p)))
          return this.client.sendMessage(message.channel, new ErrorEmbed(message).setDescription(t('events.guild.message.cmdNoPerm', language)))

      // Finalmente, executa o comando
      command.run(message, args, prefix, t, language)
    }
  }
}
