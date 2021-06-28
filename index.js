// const {Telegraf} = require('telegraf')
const axios = require('axios')
// const dotenv = require('dotenv')
const { Composer } = require('micro-bot')
// dotenv.config()
// const bot = new Telegraf(process.env.API_KEY)

const bot = new Composer

// bot.command('start', ctx => {
//    console.log(ctx.from)
//     bot.telegram.sendMessage(ctx.chat.id, 'hello there! Welcome to my new telegram bot.', {
//     })
// })
bot.start(ctx => {
    ctx.reply('Bot has started.')
})

bot.command('char', async ctx => {
    // ctx.message.text = /char Brena Tari = Brena Tari
    const char = ctx.message.text.replace('/char', '')
    if (char) {
        const charInfo = await axios.get(`https://api.tibiadata.com/v2/characters/${char}.json`).then(res => res.data.characters.data).catch(err => {
            bot.telegram.sendMessage(ctx.chat.id, 'Invalid name.')
        })
        if (!charInfo || !charInfo.name) {
            return bot.telegram.sendMessage(ctx.chat.id, 'Invalid name.')
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
        const charResponse = `<pre>${charInfo.name} ${charInfo.sex === 'male' ? '♂' : '♀'}
<b>Vocation:</b> ${charInfo.vocation} ${vocationIcon()}
<b>Level:</b> ${charInfo.level}
<b>World:</b> ${charInfo.world}
<b>Residence:</b> ${charInfo.residence}
<b>Guild:</b> ${charInfo.guild?.name ? `${charInfo.guild?.rank} of ${charInfo.guild?.name}` : '-'}
<b>Status:</b> ${charInfo.status} ${charInfo.status === 'online' ? '🟢' : '🔴'}
</pre> <a href="https://www.tibia.com/community/?subtopic=characters&name=${charInfo.name}">See more</a>`
        bot.telegram.sendMessage(ctx.chat.id, charResponse, {parse_mode: "HTML", disable_web_page_preview: true, reply_to_message_id: ctx.message.message_id})
    } else {
        bot.telegram.sendMessage(ctx.chat.id, 'Invalid name.')
    }
})

bot.command('test', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, `
        <pre>Teste h3</pre>
    `, {parse_mode: 'HTML'})
})

bot.command('share', ctx => {
    const level = ctx.message.text.split(' ')[1]
    console.log(ctx.message)
    if (level && level > 1) {
        const minLevel = Math.round(level/3*2)
        const maxLevel = Math.round(level/2*3)
        bot.telegram.sendMessage(ctx.chat.id, `A level ${level} can share experience with levels ${minLevel} to ${maxLevel}.`, {reply_to_message_id: ctx.message.message_id})
    } else {
        bot.telegram.sendMessage(ctx.chat.id, 'Invalid level.')
    }
})

// bot.on('inline_query', async (inlineQuery) => {
//     console.log(inlineQuery)
//      inlineQuery.answerInlineQuery([{
//         type: 'article',
//         id: 'idididdi',
//         title: 'Title',
//         input_message_content: {
//             message_text: 'teste testoso'
//         }
//     }])
//     // return answerInlineQuery(inlineQuery.id, [], 'Teste')
//     // bot.telegram.sendMessage(ctx.chat.id, animalMessage )
// })

bot.inlineQuery('share', async ctx => {
    console.log(ctx)
    // ctx.answerInlineQuery([{
    //     type: 'article',
    //     id: '1',
    //     title: 'Title',
    //     input_message_content: {
    //         message_text: 'teste testoso'
    //     }
    // }])
    // return answerInlineQuery(inlineQuery.id, [], 'Teste')
    return await bot.telegram.answerInlineQuery(ctx.inlineQuery.id, [{
        type: '',
        id: '1',
        title: '',
        input_message_content: {
            message_text: 'teste testoso'
        },
        reply_markup: {
            inline_keyboard: [{

            }]

        }
    }], {
        switch_pm_text: 'share <level>',
        switch_pm_parameter: 'share'
    })
})

// bot.inlineQuery('share', ctx => {
//     const level = ctx.message.text.split(' ')[1]
//     if (level && level > 1) {
//         const minLevel = Math.round(level/3*2)
//         const maxLevel = Math.round(level/2*3)
//         bot.telegram.sendMessage(ctx.chat.id, `A level ${level} can share experience with levels ${minLevel} to ${maxLevel}.`)
//     } else {
//         bot.telegram.sendMessage(ctx.chat.id, 'Invalid level.')
//     }
// })

module.exports = bot
// bot.launch();