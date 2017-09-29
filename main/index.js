const spawn = require('cross-spawn');
const path = require('path');
const processEnvsHandler = require('./handlers/processEnvsHandler');
const mcssHandler = require('./handlers/mcssHandler');

module.exports = (env, url, local) => {
    if(env) {
        processEnvs('env');
        return;
    }
    if(url) {
        processEnvs('url');
        return;
    }
    if(local) {
        processEnvs('local');
        return;
    }
    mcssHandler();
}