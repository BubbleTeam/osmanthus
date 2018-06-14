const spawn = require('cross-spawn');
const path = require('path');
const { exec } = require('child_process');


const cwd = process.cwd();
const { commands } = require(path.join(cwd, 'osmanthus.js'));

module.exports = () => {
    if (!commands || !Array.isArray(commands) || !commands.length) {
        return;
    }

    commands.forEach((command) => {
        let ls = exec(command);
        
        ls.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });
    });
};
