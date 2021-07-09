import { Context } from 'telegraf/typings';
import CommandInterface from './commandInterface';
import axios, {AxiosResponse} from 'axios';

export default class CharCommand implements CommandInterface {
    command:string = 'char';

    async execute(ctx: Context): Promise<void> {
        const char = ctx.message?.text.replace('/char', '')
        if (char) {
            const charInfo = await axios.get(`https://api.tibiadata.com/v2/characters/${char}.json`).then((res: AxiosResponse) => res.data.characters.data).catch((err) => {
                ctx.reply('Invalid name.')
            })
            if (!charInfo || !charInfo.name) {
                ctx.reply('Invalid name.')
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
            ctx.reply(charResponse, {parse_mode: "HTML", disable_web_page_preview: true, reply_to_message_id: ctx.message?.message_id})
        } else {
            ctx.reply('Try use "<pre>/char [name]</pre>"', {reply_to_message_id: ctx.message?.message_id, parse_mode: 'HTML'})
        }
    }
}
