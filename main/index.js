const spawn = require('cross-spawn');
const path = require('path');
const cwd = process.cwd();
const processEnvs = require('../lib/processEnvs');
const bootMcss = require('../lib/mcss');
const mockServer = require('../lib/mockServer');
const config = require(path.join(cwd, 'osmanthus.js'));
const hotReload = require('../livereload');
const { environments, mockPort, appPath, mockServerPath } = config;

const bootServer = (url) => {
    spawn('node', ['app.js','--NODE_CONFIG={"remoteServer":"' + url + '"}'], {stdio:[0, 1, 2]});
}

/*
    与pop之前的差异：
    - 之前：非本地mock的时候，不启动mockserver，给app.js指定remoteServer
    - 现在：总是启动mockserver，app.js的remoteServer固定指定http://127.0.0.1:8020，仅当oss -l的时候仅启动app.js，给后端调试用。
 */

module.exports = (env, url, local) => {
    if (!config) {
        console.log('missing osmanthus.js');
        return;
    }

    let localUrl = `http://127.0.0.1:${mockPort}`

    // bootMcss
    bootMcss();

    // 仅启动app.js
    if(local) {
        bootServer(localUrl);
        return;
    }

    // 连接测试环境或者指定url, 代理到url
    let targetUrl
    if(env || url) {
        targetUrl = environments[env] || url;
        processEnvs(env ? 'env' : 'url');
    } else {
        // 默认本地mock模式
        processEnvs('local');
    }

    bootServer(localUrl);
    const mockApp = mockServer(targetUrl);    // 返回mockServer app

    // 热更新
    const reload = new hotReload({ server: mockApp , watchDirs: []});
    reload.start();
}
