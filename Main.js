/**
 * Created by Pablo on 17/12/2016.
 */

//Usage: node Main.js port version [last_version]

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
const currentVersion = process.argv[3];
const lastVersion = process.argv[4];

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
    const newVersion = event.payload.release["tag_name"];
    child_process.execSync("git clone https://github.com/darkaqua/darkbot " + __dirname + "/../" + newVersion);
    process.chdir("../" + newVersion);
    try {
        child_process.execSync("npm install");
    } catch (ignored) {}
    const newPort = (port == 7777) ? 7778 : 7777;
    child_process.spawn("node", ["Main.js", newPort, newVersion, currentVersion], { detached: true });
    process.exit();
});

bot.on('message', message => {
    // console.log(bot.permissions);//member.roles.findKey("name", "adm")

    if(message.content.startsWith("!")) {
        const cmdstr = message.content.substring(0, message.content.indexOf(" "));
        const command = commands.list[cmdstr];
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

//Delete last version when this one is already running.
if(lastVersion) {
    try {
        child_process.execSync("rm -rf ../" + lastVersion);
        console.log("Last version deleted correctly.")
    } catch(e) {
        console.log("Error deleting last version: " + e)
    }
}