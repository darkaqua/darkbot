const Discord = require("discord.js");

const statuses = ["online", "idle", "invisible", "dnd"];

module.exports = {
    roles: ["[boss]"],
    descr: "Cambia el estado del bot.",
    exec: (message, args) => {
        if(statuses.includes(args[1])) {
            global.bot.user.setStatus(args[1]);
        } else {
            const embed = new Discord.RichEmbed();
            embed.setDescription("El estado debe ser `online`, `idle`, `invisible` o `dnd` (do not disturb).");
            embed.setColor(2527667);

            message.author.send('', Discord.MessageOptions = { embed: embed }).catch(console.error);
        }
        message.delete();
    }
}
