const Discord = require('discord.js');

module.exports = {
    descr: "Devuelve la version actual del bot.",
    roles: ["@everyone"],
    exec: (message, args) => {

        const embed = new Discord.RichEmbed();
        embed.setDescription(`Me encuentro en la versión ${global.config.version} ❤`);
        embed.setColor(2527667);

        message.author.send('', Discord.MessageOptions = { embed: embed });
        message.delete();
    }
}
