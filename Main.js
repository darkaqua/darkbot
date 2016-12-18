/**
 * Created by Pablo on 17/12/2016.
 */

const fs = require('fs');
const Discord = require('discord.js');

const bot = new Discord.Client();

const token = fs.readFileSync("token.txt", 'utf8');


bot.on('ready', () => {
    console.log('Here we go! ❤');
});

/**a
 * @deprecated Usado para debug
 */
function delete100Messages(){
    var channel = bot.channels.find("name", "bienvenida");
    channel.fetchMessages({limit: 100})
        .then(messages => {
            for (var i = 0; i < messages.array().length; i++) {
                var message = messages.array()[i];
                console.log(message.id + " <- Deleted!");
                message.delete();
            }
        })
        .catch(console.error);
}

bot.on('message', message => {
    // console.log(bot.permissions);//member.roles.findKey("name", "adm")
    if(!message.author.bot){
        if(message.mentions.users.findKey("id", bot.user.id) != null){
            message.reply(" lo siento, aún no puedo hacer nada..!");
        }
    }
});

//Usuario nuevo en el servidor
bot.on("guildMemberAdd", guildMemberAdd => {
    console.log(guildMemberAdd);
    var channel = bot.channels.find("name", "bienvenida");
    channel.sendMessage(guildMemberAdd + " se ha unido al servidor!");
    console.log(guildMemberAdd.name + " se ha unido al servidor!");
});

bot.login(token);