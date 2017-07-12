const Discord = require('discord.js');

module.exports = {
    roles: ["@everyone"],
    descr: "Muestra el link de la repo del bot.",
    exec: (message, args) => {

        const embed = new Discord.RichEmbed();
        embed.setTitle("Ayuda al desarrollo de Darkbot");
        embed.setDescription("Si eres valiente o tienes una buena idea para el bot y quieres ayudar puedes hacerlo creando tu fork del [proyecto](https://github.com/darkaqua/darkbot) y publicando tu pull request especificando lo que has añadido/cambiado/arreglado o dando ideas [aqui](https://github.com/darkaqua/darkbot/issues).");
        embed.setURL("https://github.com/darkaqua/darkbot");
        embed.setColor(2527667);
        embed.setTimestamp(new Date());
        embed.setThumbnail(global.bot.user.displayAvatarURL);

        message.channel.send(message.author.toString(), Discord.MessageOptions = { embed: embed });
        message.delete();
    }
}
