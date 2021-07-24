import { Context } from 'telegraf/typings';
import CommandInterface from './commandInterface';
import Character from '../entity/character';
import TibiaDataApi from './../api/tibiaDataApi';
import { Message } from 'telegraf/typings/telegram-types';

export default class CharCommand implements CommandInterface {
    command:string = 'char';

    execute(ctx: Context): Promise<Message> {
        const char = ctx.message?.text.replace('/char', '').trim();
        if (char) {
            return TibiaDataApi.getCharData(char).then(
                (charObject:Character) => ctx.reply(this.buildResponse(charObject),{parse_mode: "HTML", disable_web_page_preview: true, reply_to_message_id: ctx.message?.message_id})
            ).catch(() =>ctx.reply('Try use "<pre>/char [name]</pre>"', {reply_to_message_id: ctx.message?.message_id, parse_mode: 'HTML'}));
        } else {
            return ctx.reply('Try use "<pre>/char [name]</pre>"', {reply_to_message_id: ctx.message?.message_id, parse_mode: 'HTML'})
        }
    }

    private buildResponse = (charObject: Character):string => `${charObject.getName()} ${charObject.getSexIcon()}
<b>Vocation:</b> ${charObject.getVocation()} ${charObject.getVocationIcon()}
<b>Level:</b> ${charObject.getLevel()}
<b>World:</b> ${charObject.getWorld()}
<b>Residence:</b> ${charObject.getResidence()}
<b>Guild:</b> ${charObject.getGuildName().length > 0 ? `${charObject.getGuildRank()} of ${charObject.getGuildName()}` : '-'}
<b>Status:</b> ${charObject.getStatus()} ${charObject.getStatusIcon()}
<a href="https://www.tibia.com/community/?subtopic=characters&name=${charObject.getName()}">See more</a>`;

}
