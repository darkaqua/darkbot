const statuses = ["online", "idle", "invisible", "dnd"];

module.exports = {
    roles: ["[admin]"],
    descr: "Cambia el estado del bot.",
    exec: (message) => {
        let args = message.content.split(" ");
        if(statuses.includes(args[1])) {
            params.botuser.setStatus(args[1]);
        } else {
            message.author.sendMessage("El estado debe ser `online`, `idle`, `invisible` o `dnd` (do not disturb).");
        }
        message.delete();
    }
}
