const Discord = require('discord.js');
const punct = [",", "!", "?", "@", "#", "$", "%", "^", "&", "*"];

module.exports = {
    roles: ["[boss]"],
    descr: "Cambiar el prefijo de los comandos.",
    exec: (message, args) => {
        if(args[1] && args[1].length === 1 && punct.includes(args[1])) {
            global.config.prefix = args[1];
            message.guild.channels.find("name", "bienvenida")
                    .send("@everyone El prefijo de los comandos se ha cambiado a " + args[1], null);
        } else {
            const embed = new Discord.RichEmbed();
            embed.setDescription(`El prefijo tiene que ser uno de los siguientes caracteres: \`${punct.join(' ')}\``);
            embed.setColor(2527667);
            message.author.send('', Discord.MessageOptions = { embed: embed });
        }
        message.delete();
    }
}
