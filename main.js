
if(process.argv.length < 3) {
    console.log("Usage: node main.js [version] (old version)");
    process.exit();
}

global.config = require("../config.json");
global.config.version = process.argv[2];
if(process.argv[3])
    global.config.oldVersion = process.argv[3];

const bot = require("./bot/bot.js");
const updater = require("./updater/updater.js");

bot.init();
