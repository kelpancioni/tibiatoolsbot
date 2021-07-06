import { Context } from 'telegraf/typings';

export default interface CommandInterface {
    command: string;
    execute(ctx: Context): void;
}