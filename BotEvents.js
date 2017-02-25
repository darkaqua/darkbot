/**
 * Created by Pablo on 25/02/2017.
 */
//region Constantes
const fs = require('fs');
const http = require('http');
const https = require('https');
const Discord = require('discord.js');
const child_process = require("child_process");

const Logger = require("./Logger");
const logger = new Logger("out.log");

const commands = require("./Commands");

const main = require('./main');
const bot = main.bot;
const port = main.port;
const currentVersion = main.currentVersion;
const lastVersion = main.lastVersion;

const pingDiscord = () => {
    bot.user.setGame(`versión ${currentVersion} ❤`)
        .then()
        .catch(logger.error);
    bot.user.setStatus("online")
        .then()
        .catch(logger.error);
};

const getChannel = (channel_name) => {
    return bot.channels.find("name", channel_name);
};

const reactions = {
    darkbot_updates: ["darkaqua", "js", "nodejs"],
    voidpixel_updates: ["voidpixel", "xamarin", "win"],
    shop_top: ["upvote", "downvote"]
};
//endregion

module.exports = () => {

    bot.on('ready', () => {
        logger.message('Here we go! ❤');
        logger.message(`- Port: ${port}`);
        logger.message(`- Current version: ${currentVersion}`);
        if(lastVersion) logger.message(`- Last version: ${lastVersion}`);
        setInterval(pingDiscord, 30*1000);
    });

    bot.on('emojiCreate', emojiCreate => {
        console.log(emojiCreate);
    });

    bot.on('message', message => {
        // console.log(bot.permissions);//member.roles.findKey("name", "adm")

        if(!message.guild && message.author.id !== bot.user.id) {
            message.channel.sendMessage("No nos deberian ver a solas... Hablame por una sala del servidor.");
        } else if(message.content.startsWith("!")) {
            if(message.guild) {
                const cmdstr = message.content.substring(0,
                    message.content.indexOf(" ") > -1 ?
                        message.content.indexOf(" ") :
                        message.content.length);
                const command = commands.list[cmdstr];
                if(command && commands.hasPermission(command, message.member)) {
                    let params = { botuser: bot.user, version: currentVersion };
                    command.exec(message, params);
                }
            }
        }

        //Si se escribe en un mensaje git#56 (56 siendo el numero del pull request / issue que se menciona)
        //el bot envia un embed con la info del pull/issue.
        let pattern = /git#(\d+)/ig;
        if(message.channel.name === 'darkbot_project' && message.author.id !== bot.user.id) {
            let match;
            while(match = pattern.exec(message.content)) {
                let options = {
                    hostname: "api.github.com",
                    path: `/repos/darkaqua/darkbot/issues/${match[1]}`,
                    headers: { "User-Agent": "darkaqua-darkbot" }
                };
                let req = https.request(options, (res) => {
                    let data = "";
                    res.on("data", chunk => { data += chunk; });
                    res.on("end", () => {
                        if(res.statusCode !== 404) {
                            let issue = JSON.parse(data);
                            let type = issue["pull_request"] ? "Pull Request" : "Issue";
                            let embed = new Discord.RichEmbed({ timestamp: issue["created_at"] });
                            embed.setAuthor(issue["user"]["login"], issue["user"]["avatar_url"], issue["user"]["html_url"])
                                .setTitle(`${type} #${issue["number"]} - ${issue["title"]}`)
                                .setDescription(issue["body"] ? issue["body"] : "No description provided.")
                                .setURL(issue["html_url"])
                                .setColor(issue["pull_request"] ? "#eb6420" : "#009800")
                                .setFooter(issue["state"]);
                            message.channel.sendEmbed(embed);
                        }
                    });
                });
                req.on("error", (err) => { logger.error('Request Error:' + err.message) });
                req.end();
            }
        }

        if(reactions.hasOwnProperty(message.channel.name)) {
            reactions[message.channel.name].forEach((emoji) => {
                message.react(bot.emojis.find("name", emoji)).then().catch(console.error);
            });
        }

    });

    //Usuario nuevo en el servidor
    bot.on("guildMemberAdd", join => {
        getChannel('bienvenida').sendMessage(`${join} se ha unido al servidor! :upside_down:`);
        let userNumber = join.guild.memberCount;
        if((userNumber%100) === 0){
            getChannel('bienvenida').sendMessage(`${join}, eres el usuario ${userNumber}! :stuck_out_tongue_winking_eye: `);
        }
        logger.message(`${join.user.username} se ha unido al servidor! :)`);
    });

    //Usuario deja el servidor
    bot.on("guildMemberRemove", leave => {
        getChannel('bienvenida').sendMessage(`${leave} se ha ido del servidor! :frowning2:`);
        logger.message(`${leave.user.username} se ha ido del servidor! :(`);
    });

    bot.login(config['token']);

};