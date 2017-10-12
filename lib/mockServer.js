const Koa = require('koa');
const path = require('path');
const fs = require('fs');
const cwd = process.cwd();
const { mockPath, mockPort } = require(path.join(cwd, 'osmanthus.js'));

const getMockData = async (ctx, next) => {
    let file_path = `/${ctx.method.toLowerCase()}${ctx.path}`;
    if (file_path[file_path.length - 1] == '/') {
        file_path += 'index.json';
    }
    if (file_path.substr(-5) != '.json') {
        file_path += '.json';
    }
    let base = JSON.parse(fs.readFileSync(path.join( mockPath, '__base.json'), 'utf8')),
        data = JSON.parse(fs.readFileSync(path.join( mockPath, file_path), 'utf8'));

    Object.assign(data, base);

    ctx.body = data;
    ctx.type = 'json';
    
    await next();
}

const proxy = async (ctx, next) => {
    await next();
}

/*
    targetUrl 有值的时候代理到远程地址，没有值的时候不代理。
 */
module.exports = (targetUrl) => {
    let app = new Koa();

    if(targetUrl) {
        app.use(proxy);
    } else {
        app.use(getMockData);
    }

    app.listen(mockPort);
}
