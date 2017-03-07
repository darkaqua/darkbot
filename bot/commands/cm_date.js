module.exports = {
    roles: ["@everyone"],
    descr: "Obtener la fecha actual en el servidor.",
    exec: (message, args) => {
        let date = new Date();
        message.channel.sendEmbed({
            description: "La fecha es `" + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + "` en este servidor.",
            color: 2527667
        }, message.author.toString());
        message.delete();
    }
}
