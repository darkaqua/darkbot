
const Discord = require("discord.js");

//Si el mensaje contenia una o mas imagenes como attachment
//devuelve la primera imagen, en forma `MessageAttachment`
function findFirstImage(message) {
    let att;
    message.attachments.forEach((val) => {
        if(val.width && !att) {
            att = val;
        }
    });
    return att;
}

//Crea y devuelve el embed en forma `RichEmbed` con el mensaje, su autor, el canal, etc.
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
    exec: (message, args) => {
        if(!args[1]) {
            //Si no se ha usado el comando correctamente, se le comunica al usuario
            //de manera privada.
            message.author.send("Uso: !quote [id del mensaje] (mencion del canal) --- La id del canal se puede omitir si el mensaje original esta en el mismo canal.")
        } else {
            //Si se ha mencionado un canal, el mensaje se busca en ese canal. En caso contrario, se busca
            //En el mismo canal del mensaje comando.
            let chan = message.mentions.channels.size > 0 ? message.mentions.channels.first() : message.channel;
            if(chan) {
                chan.fetchMessage(args[1]).then(msg => {
                    message.channel.send(
                        `Citado por ${message.author}`,
                        Discord.MessageOptions = { embed: createEmbed(msg) }
                    ).catch(console.error);
                }).catch((err) => {
                    //Si ocurre un error, se le comunica al usuario de manera privada.
                    message.author.send("Ha ocurrido un error, quizá el mensaje no existe.").catch(console.error);
                    console.error(err);
                });
            } else {
                //Si el canal no existe, se le comunica al usuario de manera privada.
                message.author.send("El canal especificado no existe.").catch(console.error);
            }
        }
        message.delete();
    }
}
