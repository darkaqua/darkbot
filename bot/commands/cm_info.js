module.exports = {
    roles: ["@everyone"],
    descr: "Muestra el link de la repo del bot.",
    exec: (message, args) => {
        message.author.sendEmbed({ description: "Puedes ayudar aqui: https:\/\/github.com/mcmacker4/darkbot2" });
        message.delete();
    }
}
