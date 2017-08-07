const Discord = require("discord.js");
const fs = require("fs");

function hasPermission(command, member) {
    for(let i = 0; i < command.roles.length; i++) {
        let role = command.roles[i];
        if(member.roles.findKey("name", role)) {
            return true;
        }
    }
    return false;
}

const joinableRoleIds = [];
exports.joinableRoles = {};
Object.entries(global.config.roles).forEach((entry) => {
    joinableRoleIds.push(entry[1]);
    const aliases = entry[0].split(',');
    aliases.forEach((alias) => {
        exports.joinableRoles[alias] = joinableRoleIds[joinableRoleIds.length - 1];
    });
});

exports.hasPermission = hasPermission;
exports.list = {
    "help": {
        roles: ["@everyone"],
        descr: "Descripcion de los comandos disponibles.",
        exec: (message) => {
            let embed = new Discord.RichEmbed({ color: 2527667 });
            for(let cmd in exports.list) {
                if(!exports.list.hasOwnProperty(cmd))
                    continue;
                let command = exports.list[cmd];
                if(hasPermission(command, message.member)) {
                    embed.addField(global.config.prefix + cmd, command.descr + " - " + command.roles.join());
                }
            }
            message.author.send('', Discord.MessageOptions = { embed: embed }).catch(console.error);
            message.delete();
        }
    }
};

fs.readdirSync(__dirname).forEach(name => {
    let pattern = /^cm_(.+)\.js/i;
    if(pattern.test(name)) {
        let match = pattern.exec(name);
        exports.list[match[1]] = require("./" + match[0]);
    }
});
