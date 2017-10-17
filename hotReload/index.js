const WSServer = require('./wsServer');
const watcher = require('./watcher');
const path = require('path');
const cwd = process.cwd();
const { watch } = require(path.join(cwd, 'osmanthus.js'));

module.exports = class HotReload {
    constructor({ server, watchDirs = []}) {
        this.server = server;
        this.watchDirs = watchDirs;
    }
    
    start() {
        const wss = new WSServer({ server: this.server });
        wss.start();

        const watches = new watcher({ files: watch, wss });
        watches.start();
    }
}