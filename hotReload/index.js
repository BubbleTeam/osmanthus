const WSServer = require('./wsServer');
const watcher = require('./watcher');
const path = require('path');
const cwd = process.cwd();
const { watch } = require(path.join(cwd, 'osmanthus.js'));

module.exports = class HotReload {
    constructor({ port, watchDirs = []}) {
        this.port = port;
        this.watchDirs = watchDirs;
    }
    
    start() {
        const wss = new WSServer({ port: this.port });
        wss.start();

        const watches = new watcher({ files: watch, wss });
        watches.start();
    }
}