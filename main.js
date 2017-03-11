
//No se ha iniciado correctamente el bot.
if(process.argv.length < 3) {
    console.log("Usage: node main.js [version] (old version)");
    process.exit();
}

//La version se pasa como primer argumento en la consola
global.config.version = process.argv[2];
//Cargar la configuracion del archivo de configuracion
//En caso de que la versión actual sea 'travis', para comprobar si el
//codigo es correcto, se pasarán valores vacios.
global.config = global.config.version === 'travis'
    ? { token: '', webhook_secret: '', prefix: 'travis'}
    : require("../config.json");
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
