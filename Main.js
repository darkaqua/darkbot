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
const config = JSON.parse(fs.readFileSync("./config.json"));
const handler = createHandler({ path: '/webhook', secret: config['handlerHash'] });

const port = process.argv[2];

http.createServer(function (req, res) {
    handler(req, res, function (err) {
        res.statusCode = 202;
        res.end('no such location');
    });
}).listen(7777);

handler.on("error", (err) => {
    console.error('Error:', err.message)
});

handler.on("release", (event) => {
    let tagName = event.payload.release.tag_name;
    process.chdir("..");
    child_process.execSync("git clone https://github.com/darkaqua/darkbot");
    child_process.execSync("mv darkbot " + tagName);
    process.chdir("tagName");
    child_process.execSync("npm install");
    child_process.spawn("node", ["Main.js", (port == 7777) ? 7777 : 7778], { detached: true });
    process.exit();
});

bot.on('ready', () => {
    console.log('Here we go! ❤');
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
    const channel = bot.channels.find("name", "bienvenida");
    channel.sendMessage(guildMemberAdd + " se ha unido al servidor!");
    console.log(guildMemberAdd.name + " se ha unido al servidor!");
});

bot.login(config['token']);