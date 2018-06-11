#!/usr/bin/env node

const yargs = require('yargs');

const { argv } = yargs
    .usage('Usage: oss | oss -l | oss -e feature1 | oss -u http://10.240.177.151:8020')
    .version()
    .alias('v', 'version')
    // 代理到测试环境
    .option('env', {
        alias: 'e',
        describe: 'specify a test environment to connect'
    })
    // 代理到某个url
    .option('url', {
        alias: 'u',
        describe: 'specify an url to connect'
    })
    // 代理到某个url
    .option('port', {
        alias: 'p',
        describe: 'specify a port for mock server'
    })
    // 本地mock
    .alias('local', 'l')
    .boolean('l')
    .describe('l', 'local mode,no mock server,for backend')
    .alias('h', 'help')
    .help('h');

let { 
    env, url, port, local, version, help 
} = argv;

if (!version && !help) {
    require('./main')(env, url, port, local);
}
