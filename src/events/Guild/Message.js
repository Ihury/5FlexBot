const { MessageEmbed } = require('discord.js')
const { Event } = require('../../Structures')
const { ErrorEmbed } = require('../../utils/Embeds')

class Message extends Event {
  constructor (client) {
    super(client, {
      name: 'message'
    })
  }

  run = async(message) => {
    // Se o autor da mensagem for um bot ou o canal do comando não for de texto, ignora
    if (message.author.bot || message.channel.type !== 'text') return

    // Temporariamente desconsiderado, uma vez que não existe ligação à DB ainda para poder pegar o prefixo
    // const prefix = /* prefixo pegado da cache da DB para o servidor onde o comando foi executado */ || process.env.BOT_PREFIX
    const prefix = process.env.BOT_PREFIX

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
      // Verificar se o comando é restrito apenas para o Frango
      // Se for e o membro não for o Frango, o comando não é executado
      if (command.ownerOnly && message.member.id !== process.env.OWNER_ID) return

      // Verificar se o comando tem um cooldown definido
      if (command.cooldown) {
        const cooldown = this.client.cooldowns.find(c => c.guildID === message.guildID && c.userID === message.author.id && c.cmd === command.name)

        // Verificar se o membro está em cooldown do comando
        if (cooldown) {
          const now = Date.now()
          const expiresIn = cooldown.timestamp + command.cooldown

          if (now > expiresIn) {
            const timeLeft = command.cooldown - (now - expiresIn)/1000

            return message.channel
              .send(new ErrorEmbed(message).setDescription(`Por favor aguarde **${timeLeft.toFixed(1)}** segundos até poder utilizar esse comando novamente.`))
              .catch(()=>{})
          }
        }
      }

      // Verificar se o comando requer alguma permissão e se o membro a tem
      if (command.permissions.length > 0)
        if (!message.member.permissions.has(command.permissions))
          return message.channel
            .send(new ErrorEmbed(message).setDescription('Você não tem permissão para utilizar esse comando!'))
            .catch(()=>{})

      // Finalmente, executa o comando
      command.run(message, args, prefix)
    }
  }
}

module.exports = Message
