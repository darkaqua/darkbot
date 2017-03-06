module.exports = (member) => {
    global.bot.channels.find("name", "bienvenida").sendMessage(`${member} se ha ido del servidor! :frowning2:`);
}
