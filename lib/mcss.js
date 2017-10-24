const spawn = require('cross-spawn');
const path = require('path');

const cwd = process.cwd();
const { mcss } = require(path.join(cwd, 'osmanthus.js'));

module.exports = () => {
    let { execPath, mcssRoot, params } = mcss;

    if (execPath && mcssRoot) {
        spawn(execPath, [...params, mcssRoot], { stdio: [0, 1, 2] });
    }
};
