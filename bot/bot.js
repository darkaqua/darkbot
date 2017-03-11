const Discord = require("discord.js");
const fs = require("fs");
const path = require("path");

global.bot = exports._bot_ = new Discord.Client();
exports.init = function() {
    //Acoplar todos los eventos
    //Lee todos los archivos de la carpeta ./events/ y los acopla
    //El nombre del archivo sin extension tiene que ser el nombre del evento.
    fs.readdirSync(path.join(__dirname, "events")).forEach((name) =>{
        //bot.on(<nombre del archivo sin extension>, require(nombre del archivo))
        exports._bot_.on(/(.+)\.js/i.exec(name)[1], require(`./events/${name}`));
    })
    //Loguear el bot con el token
    if(global.config.version !== 'travis')
        exports._bot_.login(global.config.token);
}
