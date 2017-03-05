const Discord = require("discord.js");
const fs = require("fs");
const path = require("path");

global.bot = exports._bot_ = new Discord.Client(),
exports.init = function() {
    //Acoplar todos los eventos de ./events/
    fs.readdirSync(path.join(__dirname, "events")).forEach((name) =>{
        exports._bot_.on(/(.+)\.js/i.exec(name)[1], require(`./events/${name}`));
    })
    //Loguear el bot
    exports._bot_.login(global.config.token);
}
