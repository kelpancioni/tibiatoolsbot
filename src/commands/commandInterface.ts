import { Context } from 'telegraf/typings';
import { Message } from 'telegraf/typings/telegram-types';

export default interface CommandInterface {
    command: string;
    execute(ctx: Context): Promise<Message>;
}