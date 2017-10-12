const spawn = require('cross-spawn');
const path = require('path');
const processEnvsHandler = require('./handlers/processEnvsHandler');
const mcssHandler = require('./handlers/mcssHandler');
const config = require(path.join(cwd, 'osmanthus.js'));
const { environments, mockPort, appPath, mockServerPath } = config;

const bootServer = (url) => {
    spawn('node', [appPath, `--NODE_CONFIG={ remoteServer: ${url} }`], {stdio:[0, 1, 2]});
}

const bootMockServer = () => {
    spawn('node', [mockServerPath], {stdio:[0, 1, 2]})
}

module.exports = (env, url, local) => {
    if (!config) {
        console.log('missing osmanthus.js');
        return;
    }

    // mcss
    mcssHandler();

    // 连接测试环境或者指定url
    if(env || url) {
        let targetUrl = environments[env] || url;
        processEnvsHandler(env ? 'env' : 'url');
        bootServer(targetUrl);
        return;
    }

    // 默认本地mock模式
    processEnvsHandler('local');
    bootServer(`http:127.0.0.1:${mockPort}`);
    bootMockServer();
}