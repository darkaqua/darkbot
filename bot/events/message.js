const cmd_dispatch = require("../commands/dispatcher.js");
const issueMention = require("../issueMention.js");

module.exports = (message) => {

    //Si el mensaje no se ha enviado por un Guild (se ha enviado por privado)
    //se ignora
    if(!message.guild)
        return;

    //El pattern que sigue una mencion de una issue de github
    let gitPttrn = /git#(\d+)/i;

    if(message.content.startsWith(global.config.prefix)) {
        //El mensaje empieza por el prefijo
        cmd_dispatch(message);
    } else if(gitPttrn.test(message.content)) {
        //Se ha mencionado una issue.
        let match;
        while(match = gitPttrn.exec(message.content)) {
            issueMention(message, gitPttrn.exec(message.content)[1]);
        }
    }

}
