module.exports = {
    descr: "Devuelve la version actual del bot.",
    roles: ["@everyone"],
    exec: (message, args) => {
        message.author.sendMessage(`El bot se encuentra en la versión ${global.config.version}`);
        message.delete();
    }
}
