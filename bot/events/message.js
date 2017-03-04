const dispatch = require("../commands/dispatcher.js").dispatch;

module.exports = (message) => {

    if(message.content.startsWith("!")) {
        dispatch(message);
    } else if(message.mentions.users.get("229262875934326787")) {
        message.author.sendMessage("Ke Kiere?");
        message.delete();
    }

}
