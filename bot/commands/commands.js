const Discord = require("discord.js");

function hasPermission(command, member) {
    for(let i = 0; i < command.roles.length; i++) {
        let role = command.roles[i];
        if(member.roles.findKey("name", role)) {
            return true;
        }
    }
    return false;
}

exports.hasPermission = hasPermission;
exports.list = {};
exports.list["!help"] = {
    roles: ["@everyone"],
    descr: "Descripcion de los comandos disponibles.",
    exec: (message) => {
        let embed = new Discord.RichEmbed();
        for(let cmd in exports.list) {
            let command = exports.list[cmd];
            if(hasPermission(command, message.member)) {
                embed.addField(cmd, command.descr + " - " + command.roles.join());
            }
        }
        message.author.sendEmbed(embed);
        message.delete();
    }
};

exports.list["!ping"] = require("./ping.js").cmd;
exports.list["!quote"] = require("./quote.js").cmd;
