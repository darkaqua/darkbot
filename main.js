
//No se ha iniciado correctamente el bot.
if(process.argv.length < 3) {
    console.log("Usage: node main.js [version] (old version)");
    process.exit();
}

//Cargar la configuracion del archivo de configuracion
global.config = require("../config.json");
//La version se pasa como primer argumento en la consola
global.config.version = process.argv[2];
//La version antigua es opcional y se pasa como segundo argumento
if(process.argv[3])
    global.config.oldVersion = process.argv[3];

//Cargar el bot
const bot = require("./bot/bot.js");
//Inicializar el updater
const updater = require("./updater/updater.js");

//Iniciar el bot.
//Hay que iniciar el bot despues de iniciar el updater
bot.init();
