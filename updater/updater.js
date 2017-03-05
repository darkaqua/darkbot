const fs = require("fs");
const http = require("http");
const https = require("https");
const Discord = require("discord.js");
const child_process = require("child_process");
const createHandler = require("github-webhook-handler");
const handler = createHandler({path: "/", secret: global.config.webhook_secret});

const server = http.createServer((req, res) => {
    handler(req, res, (err) => {
        res.statusCode = 404;
        res.end("No such file or directory.");
    });
}).listen(7777);

handler.on("release", (evt) => {
    let newVersion = evt.payload.release.tag_name;
    //Asegurarnos de que el bot esta `ready`
    if(global.bot.readyAt) {
        global.bot.user.setGame("Actualizando a " + newVersion);
    }
    //cerrar el servidor http para que el nuevo bot pueda escuchar el mismo puerto.
    server.close();

    //Clonar la nueva version a una carpeta paralela
    child_process.execSync("git clone https:\/\/github.com/mcmacker4/darkbot2 ../" + newVersion);
    process.chdir("../" + newVersion)
    //Instalar dependencias
    child_process.execSync("npm install");

    //Abrir archivo para el log
    const stdio = fs.openSync("out.log", "a");

    //Destruir el bot actual y ejecutar el nuevo.
    child_process.spawn("node", ["main.js", newVersion, global.config.version], { detached: true, stdio: ["ignore", stdio, stdio] });
    process.exit();
});

global.bot.on("ready", () => {
    if(global.config.oldVersion) {
        //Avisar con embed de que se ha actualizado.
        //Pide info sobre la nueva version a la api de github.
        let options = {
            hostname: "api.github.com",
            path: `/repos/mcmacker4/darkbot2/releases/tags/${global.config.version}`,
            headers: { "User-Agent": "darkaqua-darkbot" }
        };
        let req = https.request(options, (res) => {
            let data = "";
            res.on("data", chunk => { data += chunk; });
            res.on("end", () => {
                if(res.statusCode !== 404) {
                    let release = JSON.parse(data);
                    let type = release["prerelease"] ? "pre-release" : "release";
                    let embed = new Discord.RichEmbed({
                        timestamp: release["created_at"],
                        author: {
                            name: release["tag_name"] + ": " + release["name"],
                            url: release["html_url"]
                        }
                    });
                    embed.setDescription(release["body"]);
                    embed.setFooter(type);
                    embed.setColor("#2691b3");
                    global.bot.channels.get("272393533040885761").sendEmbed(embed, "Nueva version!");
                }
            });
        });
        req.on("error", (err) => { logger.error('Request Error:' + err.message) });
        req.end();

        //Eliminar version antigua
        try {
            child_process.execSync("rm -rf ../" + global.config.oldVersion);
        } catch (err) {
            console.log("Error al eliminar version antigua: " + err.message);
        }
    }
    global.bot.user.setGame("version " + global.config.version);
});
