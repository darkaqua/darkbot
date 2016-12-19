/**
 * Created by Pablo on 17/12/2016.
 */

const fs = require('fs');
const http = require('http');
const Discord = require('discord.js');
const child_process = require("child_process");
const createHandler = require('github-webhook-handler');

const bot = new Discord.Client();
const commands = require("./Commands");
const config = JSON.parse(fs.readFileSync("../config.json"));
const handler = createHandler({ path: '/webhook', secret: config['handlerHash'] });

const port = process.argv[2] ? process.argv[2] : 7777;
let lastVersion = process.argv[3];
const currentVersion = process.argv[4] ? process.argv[4] : "0.1";

try {
    child_process.exec("screen -X -S darkbot_" + lastVersion + " quit");
} catch (ignored) {}

http.createServer(function (req, res) {
    handler(req, res, function (err) {
        res.statusCode = 202;
        res.end('no such location');
    });
}).listen(port);

let channel = [];

bot.on('ready', () => {
    console.log('Here we go! ❤');
    console.log("-Port: " + port);
    console.log("-Last versión: " + lastVersion);
    console.log("-Current versión: " + currentVersion);

    bot.user.setGame("versión " + currentVersion + " ❤");
    channel['bienvenida'] = bot.channels.find("name", "bienvenida");
});

handler.on("error", (err) => {
    console.error('Error:', err.message)
});

handler.on("release", (event) => {
    let tagName = event.payload.release.tag_name;
    process.chdir("..");
    child_process.execSync("git clone https://github.com/darkaqua/darkbot");
    child_process.execSync("mv darkbot " + tagName);
    process.chdir(tagName);
    try {
        child_process.execSync("npm install");
    } catch (ignored) {}
    child_process.execSync("screen -dmS darkbot_" + tagName + "");
    child_process.execSync("screen -r darkbot_" + tagName + " -p 0 -X stuff 'node Main.js'");
    child_process.execSync("screen -r darkbot_" + tagName + " -p 0 -X stuff ' " + ((port == 7777) ? "7778" : "7777") + " " + currentVersion + " " + tagName + " '");
    child_process.execSync("screen -r darkbot_" + tagName + " -p 0 -X stuff '^M'");//^M
    process.exit();
});

bot.on('message', message => {
    // console.log(bot.permissions);//member.roles.findKey("name", "adm")

    if(message.content.startsWith("!")) {

        const command = commands.list[message.content.split(" ")[0]];
        if(command && commands.hasPermission(command, message.member)) {
            command.exec(message);
        }

    } else if(!message.author.bot){
        if(message.mentions.users.findKey("id", bot.user.id) != null){
            message.reply(" lo siento, aún no puedo hacer nada..!");
            message.reply("Ayudame a mejorar con tu aportación... https://github.com/darkaqua/darkbot");
        }
    }
});

//Usuario nuevo en el servidor
bot.on("guildMemberAdd", guildMemberAdd => {
    channel['bienvenida'].sendMessage(guildMemberAdd + " se ha unido al servidor! :upside_down:");
    console.log(guildMemberAdd.user.username + " se ha unido al servidor! :)");
});

bot.on("guildMemberRemove", guildMemberRemove => {
    channel['bienvenida'].sendMessage(guildMemberRemove + " se ha ido del servidor! :frowning2: ");
    console.log(guildMemberRemove.user.username + " se ha ido del servidor! :(");
});

bot.login(config['token']);