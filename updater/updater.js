const http = require("http");
const createHandler = require("github-webhook-handler");
const handler = createHandler({path: "/", secret: global.config.webhook_secret});

http.createServer((req, res) => {
    handler(req, res, (err) => {
        res.statusCode = 404;
        res.end("No such file or directory.");
    });
}).listen(7777);

handler.on("release", (evt) => {
    if(global.bot.readyAt.getTime() < new Date().getTime()) {
        global.bot.channels.get("272393533040885761").sendMessage("Actualizando a la version " + evt.payload.release.tag_name);
    }
});
