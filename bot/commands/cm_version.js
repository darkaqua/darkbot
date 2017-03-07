module.exports = {
    descr: "Devuelve la version actual del bot.",
    roles: ["@everyone"],
    exec: (message, args) => {
        message.author.sendEmbed({
            description: `Me encuentro en la versión ${global.config.version} ❤`,
            color: 2527667
        });
        message.delete();
    }
}
