/**
 * Created by McMacker4 on 18/12/2016.
 * Modified by MagicInventor (http://magicinventor.xyz) on 20/12/2016
 */

const commands = {
    list: {
        "!temp": {
            whatdo: "Borra el mensaje del comando al cabo de 5000 ms,",
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
        "!help": {
            whatdo: "Es el comando que estas usando ahora.",
            roles: ["@everyone"],
            exec: (message) => {

                var full_help = "";
                for (var key in commands.whatdo) {
                    full_help += key + " - " + commands.whatdo[key].info + "\n";
                }

                message.channel.sendMessage(full_help);
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
