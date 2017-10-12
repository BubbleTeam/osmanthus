const Koa = require('koa');
const path = require('path');
const fs = require('fs');
const cwd = process.cwd();
const { mockPath, mockPort } = require(path.join(cwd, 'osmanthus.js'));

module.exports = () => {
    let app = new Koa();

    app.use(async (ctx, next) => {
        var file_path = `/${ctx.method.toLowerCase()}${ctx.path}`;
        if (file_path[file_path.length - 1] == '/') {
            file_path += 'index.json';
        }
        if (file_path.substr(-5) != '.json') {
            file_path += '.json'
        }
        var base = JSON.parse(fs.readFileSync(path.join( mockPath, '__base.json'), 'utf8')),
            data = JSON.parse(fs.readFileSync(path.join( mockPath, file_path), 'utf8'));

        for (let key in base) {
            data[key] = base[key];
        }

        for (let key in base) {
            if (data[key] !== undefined) data[key] = base[key];
        }

        ctx.body = data;
        ctx.type = 'json';
        
        await next();
    });

    app.listen(mockPort);
}
