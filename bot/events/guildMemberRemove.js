module.exports = (member) => {
    global.bot.channels.find("name", "bienvenida").send(`${member} se ha ido del servidor! :frowning2:`);
}
