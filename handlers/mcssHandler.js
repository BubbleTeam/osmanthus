const spawn = require('cross-spawn');
const path = require('path');
const cwd = process.cwd();
const config = require(path.join(cwd, 'osmanthus.js'));

module.exports = () => {
    let { exexecPath, mcssRoot, params } = config.processEnvs.mcss;
    if (exexecPath && mcssRoot) {
        spawn(exexecPath, mcssRoot, ...params);
    }
}