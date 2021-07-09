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
            ctx.reply('Funciona', {reply_to_message_id: ctx.message?.message_id, parse_mode: 'HTML'})
        } else {
            ctx.reply('Try use "<pre>/char [name]</pre>"', {reply_to_message_id: ctx.message?.message_id, parse_mode: 'HTML'})
        }
    }
}
