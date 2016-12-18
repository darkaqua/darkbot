/**
 * Created by McMacker4 on 18/12/2016.
 */

const commands = {
    list: {
        "!temp": {
            roles: ["Adminsitrador"],
            exec: (message) => {
                message.delete(5000);
            }
        },
        "!info": {
            roles: ["@everyone"],
            exec: (message) => {
                message.reply("Ayudame a mejorar: https://github.com/darkaqua/darkbot");
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