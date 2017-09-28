const spawn = require('cross-spawn');
const path = require('path');

module.exports = (env, url, local) => {
    if(env) {
        return false;
    }
    if(url) {
        return false;
    }
    if(local) {
        return false;
    }
}