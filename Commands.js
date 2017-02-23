/**
 * Created by McMacker4 on 18/12/2016.
 * Modified by MagicInventor (http://magicinventor.xyz) on 20/12/2016
 * Modified by Pablo on 24/12/2016
 */
const embedFactory = require("./embedFactory.js");
const Discord = require("discord.js");

const statuses = ["online", "idle", "invisible", "dnd"];

const commands = {
    list: {
        "!version" :{
            whatdo: "Muestra la versión del bot.",
            roles: ["@everyone"],
            exec: (message, params) => {
                message.reply(" me encuentro en la versión " + params.version + " :blush:");
            }
        },
        "!temp": {
            whatdo: "Borra el mensaje del comando pasados 5 segundos.",
            roles: ["[admin]"],
            exec: (message) => {
                message.delete(5000);
            }
        },
        "!info": {
            whatdo: "Muestra el link de la repo del bot.",
            roles: ["@everyone"],
            exec: (message) => {
                message.author.sendMessage("Ayudame a mejorar: https://github.com/darkaqua/darkbot");
                message.delete();
            }
        },
        "!quote": {
            whatdo: "Citar un mensaje del canal.",
            roles: ["@everyone"],
            exec: (message) => {
                let id = message.content.split(" ")[1];
                if(id) {
                    message.channel.fetchMessage(id).then(msg => {
                        message.channel.sendEmbed(embedFactory.createEmbed(msg));
                    }).catch(err => {
                        message.reply("An error ocurred.")
                                .then(msg => msg.delete(5000));
                    })
                    message.delete();
                }
            }
        },
        "!status": {
            whatdo: "Cambiar el estado del bot.",
            roles: ["[admin]"],
            exec: (message, params) => {
                let args = message.content.split(" ");
                if(statuses.includes(args[1])) {
                    params.botuser.setStatus(args[1]);
                } else {
                    message.reply("El estado debe ser `online`, `idle`, `invisible` o `dnd` (do not disturb).")
                        .then(msg => msg.delete(5000));
                }
                message.delete();
            }
        },
        "!help": { // <= acá hice cualquier cosa jaja, ya lo fixe
            whatdo: "Es el comando que estas usando ahora.",
            roles: ["@everyone"],
            exec: (message, params) => {

                let embed = new Discord.RichEmbed();
                embed.setAuthor("Darkaqua", params.botuser.displayAvatarURL);
                embed.setTitle("Comandos disponibles");

                for (var key in commands.list) {
                    if(!commands.hasPermission(commands.list[key], message.member))
                        continue;
                    embed.addField(key, commands.list[key].whatdo + " - " + commands.list[key].roles.join(", "));
                }
                
                //No poner sendCode porque sino no hay mencion al usuario.
                message.author.sendEmbed(embed);
                message.delete();

            }
        }
    },
    hasPermission: (command, member) => {
        for (let i = 0; i < command.roles.length; i++) {
            let role = command.roles[i];
            if (member.roles.findKey("name", role)) {
                return true;
            }
        }
        return false;
    }
};

module.exports = commands;
