module.exports.run = async (bot, msg, args) => {
    try {
        const res = await bot.rcon.send(`restart`)
        return msg.react('335548356552294410')
    } catch (e) { bot.cmdFailed(msg) }
}

module.exports.help = {
    name: 'restart',
    aliases: [],
    description: 'Restarts the server.',
    admin: true
}
