/**
 * Created by McMacker4 on 18/12/2016.
 * Modified by MagicInventor (http://magicinventor.xyz) on 20/12/2016
 * Modified by Pablo on 24/12/2016
 */
const embedFactory = require("./embedFactory.js");

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
            roles: ["Adminsitrador"],
            exec: (message) => {
                message.delete(5000);
            }
        },
        "!info": {
            whatdo: "Muestra el link de la repo del bot.",
            roles: ["@everyone"],
            exec: (message) => {
                message.reply("Ayudame a mejorar: https://github.com/darkaqua/darkbot");
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
            exec: (message) => {

                var full_help = "";
                var extrahelp = "";

                for (var key in commands.list) {
                    extrahelp = "";

	                for (var key2 in commands.list[key].roles) {
	                    extrahelp += commands.list[key].roles[key2];
	                }

	                full_help += key + " - " + commands.list[key].whatdo + " - " + extrahelp +"\n";
                }

                //No poner sendCode porque sino no hay mencion al usuario.
                message.reply(" esta es la información de los comandos... ```\n" + full_help.substring(0, full_help.length - 1) + " ```");

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
