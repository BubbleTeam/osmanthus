const Koa = require('koa');
const path = require('path');
const fs = require('fs');
const serve = require('koa-static');
const httpProxy = require('http-proxy');
const chalk = require('chalk');
const durian = require('durian');

const cwd = process.cwd();
const { mockPath, mockPort } = require(path.join(cwd, 'osmanthus.js'));

const mockMiddleware = async (ctx, next) => {
    // 不带文件类型后缀
    let file_path = `/${ctx.method.toLowerCase()}${ctx.path}`;

    // partner.kaola.com/                       这种请求
    if (file_path[file_path.length - 1] === '/') {
        file_path = file_path + 'index';
    }

    // /marketing/activityApply/popApply.json   这种形式的请求
    if (file_path.substr(-5) === '.json') {
        file_path = file_path.slice(0, -5);
    }

    let base = durian.parse(fs.readFileSync(path.join(mockPath, '__base.json'), 'utf8'));
    let data = {};

    if(fs.existsSync(path.join(mockPath, `${file_path}.json`))) {
        data = durian.parse(fs.readFileSync(path.join(mockPath, `${file_path}.json`), 'utf8'));
    } else if (fs.existsSync(path.join(mockPath, `${file_path}.js`))){
        delete require.cache[path.join(mockPath, `${file_path}.js`)];
        data = require(path.join(mockPath, `${file_path}.js`))(ctx);
    }

    Object.assign(data, base);

    ctx.body = data;
    ctx.type = 'json';

    await next();
};

const proxyMiddleware = (targetUrl) => {
    /* eslint-disable */
    const proxy = new httpProxy.createProxyServer({
        target: targetUrl
    });
    /* eslint-enable */
    return async (ctx, next) => {
        try {
            proxy.web(ctx.req, ctx.res);
            ctx.body = ctx.res;
            await next();
        } catch (e) {
            throw e;
        }
    };
};

/*
    targetUrl 有值的时候代理到远程地址，没有值的时候不代理。
    port 优先用传入的
 */
module.exports = (targetUrl, port = mockPort) => {
    let app = new Koa();

    // client静态资源
    app.use(serve(path.join(__dirname, '../hotReload/client')));

    if (targetUrl) {
        app.use(proxyMiddleware(targetUrl));
    } else {
        app.use(mockMiddleware);
    }
    console.log(chalk.green(`mock server start on port: ${port}`));

    return app.listen(port);
};
