module.exports = {
    roles: ["@everyone"],
    descr: "Pong!",
    exec: (message, args) => {
        let ping = Math.round(message.author.client.ping);
        message.author.sendMessage(`Pong! (${ping}ms)`);
        message.delete();
    }
}
