const Discord = require("discord.js");
const fs = require("fs");

exports.hasPermission = (command, member) => {
    for(let i = 0; i < command.roles.length; i++) {
        let role = command.roles[i];
        if(member.roles.findKey("name", role)) {
            return true;
        }
    }
    return false;
}

exports.list = {
    "!help": {
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
    }
};

fs.readdirSync(__dirname).forEach(name => {
    let pattern = /^cm_(.+)\.js/i;
    if(pattern.test(name)) {
        let match = pattern.exec(name);
        exports.list["!" + match[1]] = require("./" + match[0]);
    }
})
