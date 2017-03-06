
const commands = require("./commands.js");

module.exports = function(message) {
    let content = message.content;
    let parts = content.split(" ");
    parts[0] = parts[0].substring(1, parts[0].length);
    if(commands.list.hasOwnProperty(parts[0])) {
        let command = commands.list[parts[0]];
        if(commands.hasPermission(command, message.member)) {
            command.exec(message, parts);
        }
    }
}
