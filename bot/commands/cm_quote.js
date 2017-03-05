
const Discord = require("discord.js");

function findFirstImage(message) {
    let att;
    message.attachments.forEach((val) => {
        if(val.width && !att) {
            att = val;
        }
    });
    return att;
}

function createEmbed(message) {
    let embed = new Discord.RichEmbed();
    let image = findFirstImage(message);
    embed.setDescription(message.content);
    embed.setColor(message.member.highestRole.color);
    embed.setTimestamp(message.createdAt);
    embed.setAuthor(message.author.username, message.author.displayAvatarURL);
    embed.setFooter("#" + message.channel.name);
    if(image) embed.setImage(image.url);
    return embed;
}

module.exports = {
    roles: ["@everyone"],
    descr: "Citar un mensaje del canal.",
    exec: (message) => {
        let args = message.content.split(" ");
        if(!args[1]) {
            message.author.sendMessage("Uso: !quote [id del mensaje] (mencion del canal) --- La id del canal se puede omitir si el mensaje original esta en el mismo canal.")
        } else {
            let chan = message.mentions.channels.size > 0 ? message.mentions.channels.first() : message.channel;
            if(chan) {
                chan.fetchMessage(args[1]).then(msg => {
                    message.channel.sendEmbed(createEmbed(msg), `Citado por ${message.author}`);
                }).catch((err) => {
                    message.author.sendMessage("Ha ocurrido un error, quizá el mensaje no existe.");
                });
            } else {
                message.author.sendMessage("El canal especificado no existe.");
            }
        }
        message.delete();
    }
}
