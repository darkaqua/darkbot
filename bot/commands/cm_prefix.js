const punct = [",", "!", "?", "@", "#", "$", "%", "^", "&", "*"];

module.exports = {
    roles: ["[admin]"],
    descr: "Cambiar el prefijo de los comandos.",
    exec: (message, args) => {
        if(args[1] && args[1].length == 1 && punct.includes(args[1])) {
            global.config.prefix = args[1];
            message.guild.channels.find("name", "bienvenida")
                    .sendMessage("@everyone El prefijo de los comandos se ha cambiado a " + args[1]);
        } else {
            message.author.sendEmbed({
                description: "El prefijo tiene que ser uno de los siguientes caracteres: `" + punct.join(" ") + "`",
                color: 2527667
            });
        }
        message.delete();
    }
}
