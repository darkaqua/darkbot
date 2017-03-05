const cmd_dispatch = require("../commands/dispatcher.js");
const issueMention = require("../issueMention.js");

module.exports = (message) => {

    if(!message.guild)
        return;

    let gitPttrn = /git#(\d+)/i;

    if(message.content.startsWith("!")) {
        cmd_dispatch(message);
    } else if(gitPttrn.test(message.content)) {
        issueMention(message, gitPttrn.exec(message.content)[1]);
    }

}
