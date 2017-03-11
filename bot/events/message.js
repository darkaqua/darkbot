const cmd_dispatch = require("../commands/dispatcher.js");
const issueMention = require("../issueMention.js");

module.exports = (message) => {

    //Si el mensaje no se ha enviado por un Guild (se ha enviado por privado)
    //se ignora
    if(!message.guild)
        return;

    if(message.content.startsWith(global.config.prefix)) {
        //El mensaje empieza por el prefijo
        cmd_dispatch(message);
    }

    if(message.channel.name === "darkbot_project") {
        //El pattern que sigue una mencion de una issue de github
        let gitPttrn = /git#(\d+)/ig;
        //Se ha mencionado una issue.
        while(match = gitPttrn.exec(message.content)) {
            issueMention(message, match[1]);
        }
    }

}
