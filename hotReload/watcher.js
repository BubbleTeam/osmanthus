const chokidar = require('chokidar');
const path = require('path');

module.exports = class Watcher {
    constructor({ files, wss}) {
        this.watchFiles = files;
        this.wss = wss;
    }

    start() {
        const watcher = chokidar.watch(this.watchFiles, {
            ignored: /(\.git)|(\.mcss)|(node_modules)/,
            ignoreInitial: true,
            interval: 300,
            binaryInterval: 300
        })

        watcher.on('change', (filepath) => {
            console.log(`${filepath} has changed`)
            this.wss.broadcast({
                type: 'hotReload',
                payload: path.basename(filepath)
            });
        })
    }
}