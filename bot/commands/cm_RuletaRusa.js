module.exports = {
    roles: ["@everyone"],
    descr: "¿Le temes a la muerte?",
    exec: (message, args) => {
        message.reply(ruleta()).then(msg => msg.delete(5000));
        message.delete();
    }
}
const ruleta = () => {
    if(Math.floor(Math.random() * 20 % 6)== 1){
        return "!Pum! Muerto"
    }
    return "La suerte te acompaña..."
}
