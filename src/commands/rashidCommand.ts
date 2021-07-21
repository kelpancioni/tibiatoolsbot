import { Context } from 'telegraf/typings';
import CommandInterface from './commandInterface';

export default class RashidCommand implements CommandInterface {
    command:string = 'rashid';

    execute(ctx: Context): void {
        const location = [
            'Carlin',
            'Svargrond',
            'Liberty Bay',
            'Port Hope',
            'Ankrahmun',
            'Darashia',
            'Edron'
        ]
        const now = new Date((ctx.message?.date ?? 0) * 1000)
        let rashidLocation = 0
        if (now.getHours() >= 8) {
            rashidLocation = now.getDay()
        }
        if (now.getHours() >= 0 && now.getHours() < 8) {
            rashidLocation = now.getDay()-1
        }
        ctx.reply(`Rashid is in ${location[rashidLocation]} today.`, {reply_to_message_id: ctx.message?.message_id})
    }
}