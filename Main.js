/**
 * Created by Pablo on 17/12/2016.
 */

const fs = require('fs');
const Discord = require('discord.js');
const commands = require("./Commands");

const bot = new Discord.Client();

const token = fs.readFileSync("token.txt", 'utf8');

let channel = [];

bot.on('ready', () => {
    console.log('Here we go! ❤');
    channel['bienvenida'] = bot.channels.find("name", "bienvenida");
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
    console.log(guildMemberAdd.name + " se ha unido al servidor!");
});

bot.on("guildMemberRemove", guildMemberRemove => {
    channel['bienvenida'].sendMessage(guildMemberRemove + " se ha ido del servidor! :(");
    console.log(guildMemberRemove.name + " se ha ido del servidor!");
});

bot.login(token);