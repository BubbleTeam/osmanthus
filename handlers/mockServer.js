const Koa = require('koa');
const path = require('path');
const fs = require('fs');

module.exports = (mockPort) => {
    let app = Koa();

    app.use(function*(next) {
        var file_path = `/${this.method.toLowerCase()}${this.path}`;
        if (file_path[file_path.length - 1] == '/') {
            file_path += 'index.json';
        }
        if (file_path.substr(-5) != '.json') {
            file_path += '.json'
        }
        var base = JSON.parse(fs.readFileSync(__dirname + '/mocks/__base.json', 'utf8')),
            data = JSON.parse(fs.readFileSync(__dirname + '/mocks' + file_path, 'utf8'));
        for (var key in base) data[key] = base[key];
        for (var key in base) {
            if (data[key] !== undefined) data[key] = base[key];
        }
        this.body = data;
        this.type = 'json';
    });

    app.listen(mockPort);
}
