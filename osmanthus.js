const path = require('path');

module.exports = {
    // 测试环境地址
    environments: {
        'test': 'http://10.165.124.39:8188',
        'dev': 'http://10.165.126.203:8180',
        'feature1': 'http://10.165.124.109:8180',
        'feature2': 'http://10.165.124.110:8181',
        'feature3': 'http://10.165.125.209:8180',
        'feature4': 'http://10.165.125.78:8181',
        'feature5': 'http://10.165.125.79:8180',
        'feature6': 'http://10.165.125.76:8187',
        'feature7': 'http://10.165.127.44:8180',
        'feature8': 'http://10.165.126.226:8180'
    },

    // path of app.js
    appPath: path.join(__dirname, 'app.js'),

    // mockserver 端口号
    mockPort: 8020,

    // mock data 路径
    mockPath: path.join(__dirname, './mocks'),

    // 要修改的环境变量，base为通用的，local表示本地mock模式下特有的等等. 通常情况用base的就够了。
    processEnvs: {
        base: {
            NODE_CONFIG_DIR: path.join(__dirname, './my_config')
        },
        env: {

        },
        url: {

        },
        local: {

        }
    },

    // mcss启动参数
    mcss: {
        execPath: './node_modules/.bin/mcss',
        mcssRoot: '../src/main/resources/public/src/mcss/mcss.json',
        params: ['-c']
    }
}