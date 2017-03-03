const Discord = require("discord.js");
const token = require("../../config.json")["token"];

const evts = {};

evts.ready = require("./events/ready.js").handler;
evts.message = require("./events/message.js").handler;

exports._bot_ = new Discord.Client(),
exports.init = function() {
    //Acoplar todos los eventos del objeto `evts`
    for(let evt in evts) {
        if(evts.hasOwnProperty(evt)) {
            exports._bot_.on(evt, evts[evt]);
        }
    }
    //Loguear el bot
    exports._bot_.login(token);
}
