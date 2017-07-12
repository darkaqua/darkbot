const Discord = require('discord.js');

module.exports = {
    roles: ["@everyone"],
    descr: "Obtener la fecha actual en el servidor.",
    exec: (message, args) => {
        let date = new Date();
        const embed = new Discord.RichEmbed();
        embed.setDescription(`La fecha es \`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}\` en este servidor.`);
        embed.setColor(2527667);

        message.channel.send(message.author.toString(), Discord.MessageOptions = { embed: embed });
        message.delete();
    }
}
