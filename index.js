#!/usr/bin/env node

const yargs = require('yargs');
const main = require('./main')
const argv = yargs
    .usage('Usage: py -e feature1 | py -u http://10.240.177.151:8020 | py -l')
    .option('env', {
        alias: 'e',
        describe: 'specify a test environment to connect'
    })
    .option('url', {
        alias: 'u',
        describe: 'specify an url to connect'
    })
    .alias('local', 'l')
    .boolean('l')
    .describe('l', 'local mock mode')
    .alias('help', 'h')
    .help('h')
    .argv;

let { env, url, local } = argv;
main(env, url, local);