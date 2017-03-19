module.exports = {
    roles: ["@everyone"],
    descr: "¿Le temes a la muerte?",
    exec: (message, args) => {
        message.reply(Math.random() >= 0.5 ? "¡Pum! Muerto" : "La suerte te acompaña...").then(msg => msg.delete(5000));
        message.delete();
    }
}
