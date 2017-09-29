const path = require('path');
const cwd = process.cwd();
const config = require(path.join(cwd, 'osmanthus.js'));

module.exports = (mode = 'local') => {
    let { base: baseEnv, [mode]: modeENV } = config.processEnvs;

    [baseEnv, modeENV].forEach((item) => {
        Object.entries(item).forEach(([key, val]) => {
            process.env[key] = val;
        })
    })
}