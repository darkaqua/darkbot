module.exports = {
    roles: ["@everyone"],
    descr: "Muestra el link de la repo del bot.",
    exec: (message) => {
        message.author.sendMessage("Puedes ayudar aqui: https:\/\/github.com/mcmacker4/darkbot2");
        message.delete();
    }
}
