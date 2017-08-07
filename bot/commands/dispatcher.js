
const commands = require("./commands.js");

module.exports = function(message) {
    let content = message.content;
    let parts = content.split(" ");
    parts[0] = parts[0].substr(1);
    if(commands.list.hasOwnProperty(parts[0])) {
        let command = commands.list[parts[0]];
        if(commands.hasPermission(command, message.member)) {
            command.exec(message, parts);
        }
    } else if(commands.joinableRoles.hasOwnProperty(parts[0])) {
        const role = message.guild.roles.get(commands.joinableRoles[parts[0]]);
        if(role) {
            if (message.member.roles.has(role.id)) {
                message.member.addRole(role).then((member) => {
                    member.send('Te has unido al rol ' + role.name);
                }).catch((error) => {
                    message.author.send(`Ha ocurrido un error con tu ultimo comando (${error.message})`);
                })
            } else {
                message.member.removeRole(role).then((member) => {
                    member.send('Te has ido del rol ' + role.name);
                }).catch((error) => {
                    message.author.send(`Ha ocurrido un error con tu ultimo comando (${error.message})`);
                })
            }
        }
        message.delete();
    }
};
