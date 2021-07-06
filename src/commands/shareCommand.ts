import { Context } from 'telegraf/typings';
import CommandInterface from './commandInterface';

export default class ShareCommand implements CommandInterface {
    command:string = 'share';

    execute(ctx: Context): void {
        const msg: string = ctx.message?.text ?? '';
        const level: number = parseInt(msg.split(' ').pop() ?? '0');
        if (level > 1) {
            const minLevel = Math.round(level/3*2)
            const maxLevel = Math.round(level/2*3)
            ctx.reply(`A level ${level} can share experience with levels ${minLevel} to ${maxLevel}.`, {reply_to_message_id: ctx.message?.message_id})
        } else {
            ctx.reply('Try to use "<pre>/share [level]</pre>"', {reply_to_message_id: ctx.message?.message_id, parse_mode: 'HTML'})
        }
    }
}