#!/usr/bin/env node

const yargs = require('yargs');
const main = require('./main')
const argv = yargs
    .usage('Usage: oss -e feature1 | oss -u http://10.240.177.151:8020 | oss -l')
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
    .alias('help', 'h')
    .help('h')
    .argv;

let { env, url, local } = argv;
main(env, url, local);