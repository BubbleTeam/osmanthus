# osmanthus
> Mock server and hotreload.

Osmanthus桂花，开发的时候，园区里的桂花开了，很香，因而得名。  

- 命令启动POP工程，可以选择本地mock模式、连接测试环境模式、连接某个url模式。  
- 监听文件变化自动更新css或者刷新页面。
- 支持mock文件json里带注释，测试不同情况的时候，再也不用删了加，加了删。

#### Usage：

##### 1.全局安装osmanthus
```bash
$ npm i osmanthus -g
```
##### 2.在-web/app 或者 cms-web/app下新增osmanthus.js配置文件，格式参考当前目录下的osmanthus.js

##### 3.在pop-web/app 或者 cms-web/app下执行命令如下命令。

```
Usage: oss -e feature1 | oss -u http://10.240.177.151:8020 | oss -l | oss

选项：
  --version    显示版本号                                                 [布尔]
  --env, -e    specify a test environment to connect
  --url, -u    specify an url to connect
  -h           显示帮助信息                                               [布尔]
  --local, -l  local mode                                                [布尔]
```
