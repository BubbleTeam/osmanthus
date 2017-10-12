const spawn = require('cross-spawn');
const path = require('path');
const cwd = process.cwd();
const processEnvs = require('../lib/processEnvs');
const mcss = require('../lib/mcss');
const mockServer = require('../lib/mockServer');
const config = require(path.join(cwd, 'osmanthus.js'));
const { environments, mockPort, appPath, mockServerPath } = config;

const bootServer = (url) => {
    spawn('node', ['app.js','--NODE_CONFIG={"remoteServer":"' + url + '"}'], {stdio:[0, 1, 2]});
}

module.exports = (env, url, local) => {
    if (!config) {
        console.log('missing osmanthus.js');
        return;
    }

    // mcss
    mcss();

    // 连接测试环境或者指定url
    if(env || url) {
        let targetUrl = environments[env] || url;
        processEnvs(env ? 'env' : 'url');
        bootServer(targetUrl);
        return;
    }

    // 默认本地mock模式
    processEnvs('local');
    bootServer(`http://127.0.0.1:${mockPort}`);
    mockServer();
}