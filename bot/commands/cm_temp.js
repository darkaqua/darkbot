module.exports = {
    roles: ["@everyone"],
    descr: "Mensaje temporal. Elimina el mensaje a los 5 segundos.",
    exec: (message, args) => {
        message.delete(5000);
    }
}
