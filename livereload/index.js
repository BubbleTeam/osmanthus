const WSServer = require('./wsServer');

module.exports = class HotReload {
    constructor({ server, watchDirs = []}) {
        this.server = server;
        this.watchDirs = watchDirs;
    }
    
    start() {
        const wss = new WSServer({ server: this.server });
        wss.start();
    }
}