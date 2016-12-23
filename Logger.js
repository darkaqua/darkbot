/**
 * Created by McMacker4 on 23/12/2016.
 */

const fs = require("fs");

class Logger {

    constructor(filename) {
        this.out = fs.createWriteStream(filename, { flags: 'a' });
    }

    message(msg) {
        this.out.write("[MSG][" + Logger.date() + "] " + msg + "\n");
    }

    warning(msg) {
        this.out.write("[WARN][" + Logger.date() + "] " + msg + "\n");
    }

    error(msg) {
        this.out.write("[ERROR][" + Logger.date() + "] " + msg + "\n");
    }

    static date() {
        return new Date().toLocaleString();
    }

}

module.exports = Logger;
