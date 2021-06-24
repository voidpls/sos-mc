const { BOT_COLOR } = process.env
const { MessageEmbed } = require('discord.js')

const topRegex = /^(\d+)\) (.+) - (.+)$/gm
const footerMsgs = [
    'Server\'s top 10 virgins',
    'Go outside, maybe?',
    'Holy shit get a life you neets',
    'Imagine if you spent this time being productive',
    'Do you even sleep?',
    'When was the last time you showered?',
    'I can only imagine the smell...',
    'This is a children\'s game btw',
    'You should not be proud to be on this list'
]
function clean(text) {
    return text
        .replace(/§./gm, '')
        .replace(/(\~|\_|\`|\*)/gm, '\\$1')
        .trim()
}

module.exports.run = async (bot, msg, args) => {
    try {
        const time = Date.now()
        const res = await bot.rcon.send(`topplaytime`)
        const cleaned = clean(res)

        let matches, topArr = [];
        while (matches = topRegex.exec(cleaned)) {
            const time = matches[3]
                // .replace(/days?/, 'd')
                // .replace(/hrs?/, 'h')
                // .replace(/mins?/, 'm')
                .split(' ')
            if (time.length > 2) time.length = 2
            topArr.push({
                place: matches[1],
                name: matches[2],
                time: time.join(' ')
            })
        }
        const top = topArr
            .map(o => `**\`${o.place}.\`** **${o.name}** - ${o.time}`)
            .join('\n')
        const footer = footerMsgs[~~(Math.random() * footerMsgs.length)];
        const embed = new MessageEmbed()
            .setColor(BOT_COLOR)
            .setAuthor('Playtime Leaderboard', bot.user.avatarURL({format: 'png', size: 128}))
            .setDescription(top)
            .setFooter(footer)
        return msg.channel.send(embed)
    } catch (e) { bot.cmdFailed(msg) }
}

module.exports.help = {
    name: 'top',
    aliases: ['topplaytime', 'toppt', 'leaderboard'],
    description: 'Check the playtime leaderboard.',
    admin: false
}
