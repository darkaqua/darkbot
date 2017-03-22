module.exports = {
    roles: ["@everyone"],
    descr: "¿Le temes a la muerte?",
    exec: (message, args) => {
        message.reply(
            Math.floor(Math.random() * 20 % 6) === 1 
            ? "¡Pum! Muerto" 
            : "La suerte te acompaña..."
        ).then(msg => msg.delete(5000));
        message.delete();
    }
}
