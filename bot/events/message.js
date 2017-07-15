const cmd_dispatch = require("../commands/dispatcher.js");
const issueMention = require("../issueMention.js");
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

module.exports = (message) => {

    //Si el mensaje no se ha enviado por un Guild (se ha enviado por privado)
    //se ignora
    if(!message.guild)
        return;

    if(message.content.match(/gg/ig)) message.guild.channels.find("name", "gg").sendEmbed(createEmbed(message));
    
    if(message.content.startsWith(global.config.prefix)) {
        //El mensaje empieza por el prefijo
        cmd_dispatch(message);
    }

    if(message.channel.name === "darkbot_project") {
        //El pattern que sigue una mencion de una issue de github
        let gitPttrn = /git#(\d+)/ig;
        //Se ha mencionado una issue.
        while(match = gitPttrn.exec(message.content)) {
            issueMention(message, match[1]);
        }
    }

}
