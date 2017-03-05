
const commands = require("./commands.js");

module.exports = function(message) {
    let content = message.content;
    let parts = content.split(" ");
    if(commands.list.hasOwnProperty(parts[0])) {
        let command = commands.list[parts[0]];
        if(commands.hasPermission(command, message.member)) {
            command.exec(message);
        }
    }
}
