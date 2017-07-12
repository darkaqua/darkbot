module.exports = {
    roles: ["@everyone"],
    descr: "Pong!",
    exec: (message, args) => {
        let ping = Math.round(message.author.client.ping);
        message.reply(`Pong! (${ping}ms)`).then(msg => msg.delete(5000)).catch(console.error);
        message.delete();
    }
}
