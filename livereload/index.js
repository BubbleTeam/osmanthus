const WSServer = require('./wsServer');

module.exports = class HotReload {
    constructor({ port, watchDirs = []}) {
        this.port = port;
        this.watchDirs = watchDirs;
    }
    
    start() {
        const wss = new WSServer({ port: this.port });
        wss.start();
    }
}