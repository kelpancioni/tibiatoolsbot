const axios = require('axios')
const { Composer } = require('micro-bot')

const bot = new Composer

bot.start(ctx => {
    ctx.reply('Bot has started.')
})

bot.command('char', async ctx => {
    // ctx.message.text = /char Brena Tari = Brena Tari
    const char = ctx.message.text.replace('/char', '')
    if (char) {
        const charInfo = await axios.get(`https://api.tibiadata.com/v2/characters/${char}.json`).then(res => res.data.characters.data).catch(err => {
            ctx.reply('Invalid name.')
        })
        if (!charInfo || !charInfo.name) {
            return ctx.reply('Invalid name.')
        }
        const vocationIcon = () => {
            switch (charInfo.vocation) {
                case 'Elder Druid' : return '❄'
                case 'Druid' : return '❄'
                case 'Royal Paladin' : return '🏹'
                case 'Paladin' : return '🏹'
                case 'Elite Knight' : return '🛡'
                case 'Knight' : return '🛡'
                case 'Sorcerer' : return '🔥'
                case 'Master Sorcerer' : return '🔥'
            }
        }
        const charResponse = `${charInfo.name} ${charInfo.sex === 'male' ? '♂' : '♀'}
<b>Vocation:</b> ${charInfo.vocation} ${vocationIcon()}
<b>Level:</b> ${charInfo.level}
<b>World:</b> ${charInfo.world}
<b>Residence:</b> ${charInfo.residence}
<b>Guild:</b> ${charInfo.guild?.name ? `${charInfo.guild?.rank} of ${charInfo.guild?.name}` : '-'}
<b>Status:</b> ${charInfo.status} ${charInfo.status === 'online' ? '🟢' : '🔴'}
<a href="https://www.tibia.com/community/?subtopic=characters&name=${charInfo.name}">See more</a>`
        ctx.reply(charResponse, {parse_mode: "HTML", disable_web_page_preview: true, reply_to_message_id: ctx.message.message_id})
    } else {
        ctx.reply('Try use "<pre>/char [name]</pre>"', {reply_to_message_id: ctx.message.message_id, parse_mode: 'HTML'})
    }
})

bot.command('test', ctx => {
    ctx.reply(`<pre>Teste h3</pre>`, {parse_mode: 'HTML'})
})

bot.command('share', ctx => {
    const level = ctx.message.text.split(' ')[1]
    if (level && level > 1) {
        const minLevel = Math.round(level/3*2)
        const maxLevel = Math.round(level/2*3)
        ctx.reply(`A level ${level} can share experience with levels ${minLevel} to ${maxLevel}.`, {reply_to_message_id: ctx.message.message_id})
    } else {
        ctx.reply('Try to use "<pre>/share [level]</pre>"', {reply_to_message_id: ctx.message.message_id, parse_mode: 'HTML'})
    }
})

// bot.on('inline_query', async (inlineQuery, answerInlineQuery) => {
//     console.log(inlineQuery)
//     //  return answerInlineQuery({
//     //     type: 'article',
//     //     id: '1',
//     //     title: 'Teste',
//     //     input_message_content: {
//     //         message_text: 'teste testoso'
//     //     }
//     // })
//     // return answerInlineQuery(inlineQuery.id, [], 'Teste')
//     // bot.telegram.sendMessage(ctx.chat.id, animalMessage )
// })

// bot.inlineQuery('share2', (ctx) => {
//     // // const level = ctx.message.text.split(' ')[1]
//     // if (level && level > 1) {
//     //     const minLevel = Math.round(level/3*2)
//     //     const maxLevel = Math.round(level/2*3)
//     //     // bot.telegram.sendMessage(ctx.chat.id, `A level ${level} can share experience with levels ${minLevel} to ${maxLevel}.`)
//     // } else {
//     //     // bot.telegram.sendMessage(ctx.chat.id, 'Invalid level.')
//     // }
//     console.log(ctx)
//     ctx.answerInlineQuery([{
//         type: 'article',
//         id: '2',
//         title: 'Testeeee',
//         input_message_content: {
//             message_text: 'teste testoso'
//         },
//         reply_markup: {
//             inline_keyboard: [[{
//                 text: '1',
//                 callback_data: '1'
//             }]]
//         }
//     }], {
//         switch_pm_text: 'teste',
//         switch_pm_parameter: 'share'
//     })
// })

module.exports = bot