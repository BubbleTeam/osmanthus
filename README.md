[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]

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
[npm-image]: https://img.shields.io/npm/v/osmanthus.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/osmanthus
[travis-image]:https://img.shields.io/travis/BubbleTeam/osmanthus.svg
[travis-url]: https://travis-ci.org/BubbleTeam/osmanthus