module.exports = {
    roles: ["@everyone"],
    descr: "Pong!",
    exec: (message) => {
        message.author.sendMessage("Pong!");
        message.delete();
    }
}
