const Koa = require('koa');
const path = require('path');
const fs = require('fs');
const serve = require('koa-static');
const httpProxy = require('http-proxy');
const cwd = process.cwd();
const { mockPath, mockPort } = require(path.join(cwd, 'osmanthus.js'));

const mockMiddleware = async (ctx, next) => {
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

const proxyMiddleware = (targetUrl) => {

    const proxy = new httpProxy.createProxyServer({
        target: targetUrl
    });

    return async (ctx, next) => {
        try {
            proxy.web(ctx.req, ctx.res);
            ctx.body = ctx.res;
            await next();
        } catch(e) {
            throw e;
        }
    }
}

/*
    targetUrl 有值的时候代理到远程地址，没有值的时候不代理。
 */
module.exports = (targetUrl) => {
    let app = new Koa();

    // client静态资源
    app.use(serve(path.join(__dirname, '../livereload/client')));

    if(targetUrl) {
        app.use(proxyMiddleware(targetUrl));
    } else {
        app.use(mockMiddleware);
    }

    app.listen(mockPort);
    
    return app;
}
