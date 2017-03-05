const fs = require("fs");
const http = require("http");
const child_process = require("child_process");
const createHandler = require("github-webhook-handler");
const handler = createHandler({path: "/", secret: global.config.webhook_secret});

if(global.config.oldVersion) {
    //fs.rmdir("../" + global.config.oldVersion);
}

global.bot.on("ready", () => {
    global.bot.user.setGame("version " + global.config.version);
});

const server = http.createServer((req, res) => {
    handler(req, res, (err) => {
        res.statusCode = 404;
        res.end("No such file or directory.");
    });
}).listen(7777);

handler.on("release", (evt) => {
    let newVersion = evt.payload.release.tag_name;
    //Asegurarnos de que el bot esta `ready`
    if(global.bot.readyAt.getTime() < new Date().getTime()) {
        global.bot.user.setGame("Actualizando a " + newVersion);
        global.bot.channels.get("272393533040885761").sendMessage("Actualizando a la version " + newVersion);
    }
    //cerrar el servidor http para que el nuevo bot pueda escuchar el mismo puerto.
    server.close();

    child_process.execSync("git clone https:\/\/github.com/mcmacker4/darkbot2 ../" + newVersion);
    process.chdir("../" + newVersion)
    child_process.execSync("npm install");

    const stdio = fs.openSync("start.log", "a");

    child_process.spawn("node", ["main.js", newVersion, global.config.version], { detached: true, stdio: ["ignore", stdio, stdio] });
    global.bot.destroy().then(() => process.exit());
});
