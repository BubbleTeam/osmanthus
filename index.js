#!/usr/bin/env node

const yargs = require('yargs');
const argv = yargs
    .usage('Usage: oss -e feature1 | oss -u http://10.240.177.151:8020 | oss -l')
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
    // 本地mock
    .alias('local', 'l')
    .boolean('l')
    .describe('l', 'local mock mode')
    .alias('h', 'help')
    .help('h')
    .argv;

let { env, url, local, version, help } = argv;

if(version || help) return;
require('./main')(env, url, local);