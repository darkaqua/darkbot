module.exports = {
    roles: ["@everyone"],
    descr: "Muestra el link de la repo del bot.",
    exec: (message, args) => {
        message.channel.sendEmbed({
            "title": "Ayuda al desarrollo de Darkbot",
            "description": "Si eres valiente o tienes una buena idea para el bot y quieres ayudar puedes hacerlo creando tu fork del [proyecto](https://github.com/darkaqua/darkbot) y publicando tu pull request especificando lo que has añadido/cambiado/arreglado o dando ideas [aqui](https://github.com/darkaqua/darkbot/issues).",
            "url": "https://github.com/darkaqua/darkbot",
            "color": 2527667,
            "timestamp": "2017-03-07T18:09:25.144Z",
            "thumbnail": {
                "url": global.bot.user.displayAvatarURL
            }
        }, message.author.toString());
        message.delete();
    }
}
