const path = require('path');

const cwd = process.cwd();
const { processEnvs } = require(path.join(cwd, 'osmanthus.js'));

module.exports = (mode = 'local') => {
    let { base: baseEnv, [mode]: modeENV } = processEnvs;

    [baseEnv, modeENV].forEach((item) => {
        Object.entries(item).forEach(([key, val]) => {
            process.env[key] = val;
        });
    });
};
