const ping = {
    roles: ["@everyone"],
    descr: "Pong!",
    exec: (message) => {
        message.author.sendMessage("Pong!");
        message.delete();
    }
}

module.exports = ping;
