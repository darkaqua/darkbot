const https = require("https");
const Discord = require("discord.js");

//Se ejecuta cuando alguien ha mencionado una issue de la forma git#32
//siendo 32 el numero de la issue.
//Pide la info de la issue a la API de GitHub y responde al mensaje con un
//embed que contiene informacion sobre la issue y sus links.
module.exports = (message, issue) => {
    let options = {
        hostname: "api.github.com",
        path: `/repos/mcmacker4/darkbot2/issues/${issue}`,
        headers: { "User-Agent": "darkaqua-darkbot2" }
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
    req.on("error", console.log);
    req.end();
}
