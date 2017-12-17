[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![License][license-image]][license-url]

> osmanthus(桂花)这个名字的由来：公司大神的框架Pomelo(柚子), 于是也想弄个水果当名字，不想水果太火热了，npm上基本都注册完了。那就用花吧，刚好园区里的桂花开了，就它了。

##### osmanthus？这是个什么东东？
osmanthus是一个mock server，提供基础的mock功能和hotreload。

##### 开发的原因
POP现有的基于node中间层的业务架构，将mockserver的功能耦合在一起，不是很优雅。而且没有热更新功能，影响开发体验。

##### 提供的功能
1. 命令行工具，通过参数来选择本地mock模式、连接测试环境模式、连接某个url模式。
2. 监听文件变化，自动更新css或者刷新页面。
3. 支持mock文件json里带注释，测试各种不同情况的时候，再也不用删了加，加了删。

##### 接入步骤
1.全局安装osmanthus
```bash
$ npm i osmanthus -g
```
2.工程app目录下添加osmanthus.js配置文件, 参照当前目录下的osmanthus.js。
layout.html中添加：
```html
<!-- @IGNORE -->
<script src="http://localhost:8020/__hotReload.js" id="__hotReload"></script>
<!-- /@IGNORE -->

```

3.命令行参数启动工程，例如：oss -e feature1


##### 命令行参数
直接贴上oss -h的说明
```
Usage: oss -e feature1 | oss -u http://10.240.177.151:8020 | oss -l | oss

选项：
  --version    显示版本号                                                 [布尔]
  --env, -e    specify a test environment to connect
  --url, -u    specify an url to connect
  -h           显示帮助信息                                               [布尔]
  --local, -l  local mode                                                [布尔]
```

##### mock数据路径说明
根据osmanthus.js里配置的mockPath，作为mock data的根路径，根据请求的方法，里面分get，post等文件夹，和一个\__base.json。 

![](https://haitao.nos.netease.com/519cdc7a-701e-4849-bee8-effc0b7ad80d.png)

例如一个get请求，/goods/detail 会定位到 get/goods/detail.json  
__base.json是公用数据，会和每一个请求的数据merge。  

如果找不到get/goods/detail.json，但是有get/goods/detail.js的话，就会将该js的返回值作为结果。这个方法的入参是koa里的ctx对象，方便用户获取请求的一些参数。来根据不同的清楚，返回不同的结果。示例如下：
```javascript
const fs = require('fs');
const durian = require('durian');
const path = require('path');

module.exports = function(ctx) {
    let { activityType } = ctx.query;
    let filePath = path.join(__dirname, `popDetail/popDetail${activityType}.json`);

    console.log(filePath);
    return durian.parse(fs.readFileSync(filePath).toString());
};
```



[npm-image]: https://img.shields.io/npm/v/osmanthus.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/osmanthus
[travis-image]:https://img.shields.io/travis/BubbleTeam/osmanthus.svg
[travis-url]: https://travis-ci.org/BubbleTeam/osmanthus
[license-image]: https://img.shields.io/github/license/BubbleTeam/osmanthus.svg
[license-url]: https://github.com/BubbleTeam/osmanthus/blob/master/LICENSE