const https = require("https");
const Discord = require("discord.js");

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
