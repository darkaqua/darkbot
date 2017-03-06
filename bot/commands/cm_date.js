module.exports = {
    roles: ["@everyone"],
    descr: "Obtener la fecha actual en el servidor.",
    exec: (message, args) => {
        let date = new Date();
        message.author.sendMessage("La fecha es `" + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + "` en este servidor.");
        message.delete();
    }
}
