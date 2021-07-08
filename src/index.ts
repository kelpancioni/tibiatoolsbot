import { Context } from 'telegraf/typings';
const { Composer } = require('micro-bot');

const bot = new Composer();

bot.start((ctx: Context): void => {
    ctx.reply('Bot has started.')
})

const commandsList: Array<string> = [
    // 'charCommand',
    'shareCommand'
];

function initCommands(): void {
    for (let commandName of commandsList) {
        (async () => {
            let commandImport = await import("./commands/"+commandName);
            let commandObj = new commandImport.default;
            bot.command(commandObj.command, (ctx: Context) => {
                commandObj.execute(ctx);
            });
        })();
    }
}

initCommands();

module.exports = bot