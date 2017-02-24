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

const config = JSON.parse(fs.readFileSync("../config.json"));
const handler = createHandler({ path: '/webhook', secret: config['handlerHash'] });

const port = process.argv[2] ? process.argv[2] : 7777;
const currentVersion = process.argv[3];
const lastVersion = process.argv[4];

const Logger = require("./Logger");
const logger = new Logger("out.log");

const commands = require("./Commands");

if(!port || !currentVersion) {
    console.log("Usage: node Main.js port version [last_version]");
    process.exit();
}

http.createServer(function (req, res) {
    handler(req, res, function (err) {
        res.statusCode = 202;
        res.end('no such location');
    });
}).listen(port);

let channel = [];

bot.on('ready', () => {
    logger.message('Here we go! ❤');
    logger.message("-Port: " + port);
    logger.message("-Current versión: " + currentVersion);
    if(lastVersion) logger.message("-Last versión: " + lastVersion);

    bot.user.setGame("versión " + currentVersion + " ❤");
    channel['bienvenida'] = bot.channels.find("name", "bienvenida");

    setInterval(pingDiscord, 30*1000);
});

function pingDiscord(){
    bot.user.setGame("versión " + currentVersion + " ❤")
        .then()
        .catch(logger.error);
    bot.user.setStatus("online")
        .then()
        .catch(logger.error);
}

handler.on("error", (err) => {
    logger.error('Error:', err.message)
});

handler.on("release", (event) => {
    const newVersion = event.payload.release["tag_name"];
    //Embed con info de actualización
    let embed = new Discord.RichEmbed({
      "description": "De la versión " + currentVersion + " a la " + newVersion + "..."
    });
    embed.setTitle("Actualizando...");
    embed.setColor("#2691b3");
    embed.setURL(event.payload.release["html_url"]);
    embed.addField(event.payload.release["name"], event.payload.release["body"]);
    bot.channels.get('284563684712513536').sendEmbed(embed);
    //Status del bot
    bot.user.setGame("actualizando a " + newVersion + "...")
        .then()
        .catch(logger.error);
    bot.user.setStatus("idle")
        .then()
        .catch(logger.error);

});

    bot.user.setGame("actualizando a " + newVersion + "...")
        .then()
        .catch(logger.error);
    bot.user.setStatus("idle")
        .then()
        .catch(logger.error);

    //Clone from github
    child_process.execSync("git clone https://github.com/darkaqua/darkbot " + __dirname + "/../" + newVersion);
    process.chdir("../" + newVersion);
    //Install dependencies
    try {
        child_process.execSync("npm install");
    } catch (ignored) {}
    logger.message("Installed dependencies (npm).");
    //stdio files (log files)
    const outs = fs.openSync("start.log", "a");
    const errs = fs.openSync("start.log", "a");
    //Spawn the process
    const newPort = (port == 7777) ? 7778 : 7777;
    child_process.spawn("node", ["Main.js", newPort, newVersion, currentVersion], { detached: true, stdio: ["ignore", outs, errs] });
    logger.message("New version spawned.");
    process.exit();
});

const reactions = {
    darkbot_updates: ["darkaqua", "js", "nodejs"],
    voidpixel_updates: ["voidpixel", "xamarin", "win"],
    shop_top: ["upvote", "downvote"]
};

bot.on('emojiCreate', emojiCreate => {
   console.log(emojiCreate);
});

bot.on('message', message => {
    // console.log(bot.permissions);//member.roles.findKey("name", "adm")

    if(!message.guild && message.author.id != bot.user.id) {
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

    if(reactions.hasOwnProperty(message.channel.name)) {
        reactions[message.channel.name].forEach((emoji) => {
            message.react(bot.emojis.find("name", emoji)).then().catch(console.error);
        });
    }

});

//Usuario nuevo en el servidor
bot.on("guildMemberAdd", join => {
    channel['bienvenida'].sendMessage(join + " se ha unido al servidor! :upside_down:");
    let userNumber = join.guild.memberCount;
    if((userNumber%100) == 0){
        channel['bienvenida'].sendMessage(join + ", eres el usuario " + userNumber + "! :stuck_out_tongue_winking_eye: ");
      }
    logger.message(join.user.username + " se ha unido al servidor! :)");
});

//Usuario deja el servidor
bot.on("guildMemberRemove", leave => {
    channel['bienvenida'].sendMessage(leave + " se ha ido del servidor! :frowning2: ");
    logger.message(leave.user.username + " se ha ido del servidor! :(");
});

bot.login(config['token']);

//Delete last version when this one is already running.
if(lastVersion) {
    try {
        child_process.execSync("rm -rf ../" + lastVersion);
        logger.message("Last version deleted correctly.")
    } catch(e) {
        logger.error("Error deleting last version: " + e)
    }
}
