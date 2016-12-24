/**
 * Created by McMacker4 on 18/12/2016.
 * Modified by MagicInventor (http://magicinventor.xyz) on 20/12/2016
 * Modified by Pablo on 24/12/2016
 */
const main = require("./Main");

const commands = {
    list: {
        "!version" :{
            whatdo: "Muestra la versión del bot.",
            roles: ["@everyone"],
            exec: (message) => {
                message.reply(" me encuentro en la versión " + main.currentVersion + " :blush:");
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
        "!help": { // <= acá hice cualquier cosa jaja, ya lo fixe
            whatdo: "Es el comando que estas usando ahora.",
            roles: ["@everyone"],
            exec: (message) => {

                var full_help = "";
                for (var key in commands.list) {
                    full_help += key + " - " + commands.list[key].whatdo + "\n";
                }
                //No poner sendCode porque sino no hay mencion al usuario.
                message.reply(" esta es la información de los comandos... ```\n" + full_help.substring(0, full_help.length - 2) + " ```");

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
