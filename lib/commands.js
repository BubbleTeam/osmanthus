const spawn = require('cross-spawn');
const path = require('path');

const cwd = process.cwd();
const { commands } = require(path.join(cwd, 'osmanthus.js'));

module.exports = () => {
    if (!commands || !Array.isArray(commands) || !commands.length) {
        return;
    }

    commands.forEach((command) => {
        let c = command.split(' ');
        spawn(c[0], c.slice(1), { stdio: [0, 1, 2] });
    });
};
