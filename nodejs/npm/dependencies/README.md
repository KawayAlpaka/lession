一直纠结，`dependencies` 和 `devDependencies` 有什么区别？我使用的包应该放到什么地方？网上找了一些资料，大神群里咨询了一下。得到的答案是：      
* 生产环境用到的放在 `dependencies`中;      
* 开发环境用到的放在 `devDependencies`中;       
* 这是规范，遵守就能一起玩，不遵守就自己玩;      

Emmm...大神就是喜欢说一些菜逼听不懂的话。     
问出这个问题的朋友想必都发现：无论放到`dependencies`中，还是`devDependencies`，`npm install`时都会安装，没有差别，团队合作也OK，照玩不误啊。什么叫只能自己玩？把`koa`放到`devDependencies`中有没有问题？把`webpack`放到`dependencies`又会怎么样？       
直到自己发布了 `package` 才明白了大神的意思。     

## 区别
来看看 [debug](https://github.com/visionmedia/debug) 这个`package`。它的 `package.json` 内容如下：
```json
{
  "dependencies": {
    "ms": "^2.1.1"
  },
  "devDependencies": {
    "brfs": "^2.0.1",
    "browserify": "^16.2.3",
    "coveralls": "^3.0.2",
    "istanbul": "^0.4.5",
    "karma": "^3.1.4",
    "karma-browserify": "^6.0.0",
    "karma-chrome-launcher": "^2.2.0",
    "karma-mocha": "^1.3.0",
    "mocha": "^5.2.0",
    "mocha-lcov-reporter": "^1.2.0",
    "xo": "^0.23.0"
  }
}
```
### npm install debug
依赖`debug`的项目需要这样用，手动创建一个项目
```shell
npm init
```
手动在`package.json`中添加内容
```json
{
  "dependencies": {
    "debug": "^4.1.1"
  }
}
```
安装依赖包
```shell
npm install
```
查看 `node_modules` 目录中的内容
```
-- node_modules
  -- debug
  -- ms
``` 
这时安装了：`debug`和`ms(debug的dependencies包含的package)`

### git clone debug
`debug`的开发者，或二次开发者，需要这样用。
```shell
git clone https://github.com/visionmedia/debug.git
cd debug
npm install
```
查看`node_modules`
```
-- node_modules
  -- debug
  -- ms
  -- brfs
  -- brfs  
  -- browserify
  -- coveralls
  -- istanbul
  -- karma
  -- karma-browserify
  -- karma-chrome-launcher
  -- karma-mocha
  -- mocha
  -- mocha-lcov-reporter
  -- xo
  -- connect
  -- date-format
  -- ...一共653个package
```
这时安装了：`debug`项目的 `dependencies`、`devDependencies`以及`它们的dependencies`。   

## 结论（挑战规范，知其所以然）     
1. 如果所有依赖包都是**只是**开放环境要用到的包，并且项目不需要发布到`npm`让别人使用。如`webpack`打包完成后发布`dist`的前端项目，因为生产环境不再需要依赖这些包(甚至都不需要`node`)，这时你把**依赖**放到哪里，完全**随你开心**。但为了避免有人说闲话，应该放到`devDependencies`中。    
2. 如果所有依赖包都是生产环境要用到的包，并且项目不需要发布到`npm`让别人使用。如**web**项目常用的`express`和`koa`，是生产环境运行必须的包，你也可以随便放 **（惊不惊喜意不意外）**，在生产环境中，部署生产环境时使用`npm install`，一样会把所有包安装下来，不影响生产环境的运行。为了避免有人说闲话，还是要放到`dependencies`中。
3. 如果既有开发依赖又有生产依赖，并且项目不需要发布到`npm`让别人使用。你还是可以随便放。`npm install` 会安装所有包。但就会产生问题（生产环境安装了开发环境的包），会死人吗？不太清楚，但项目是可以运行的。要避免这些额外的消耗，就要按照规范来，区分两种包的位置。在生产环境中使用`npm install --production`，则只会安装`dependencies`中的依赖。外翻篇：如果你开心，也可以把**开发依赖**包放到`devDependencies`，**生产依赖**包放到`dependencies`，生产环境就用`npm install --only=dev`，这样只会安装`devDependencies`中的依赖。
4. 如果是一个要发布到`npm`的项目，生产依赖就**一定**要放在`dependencies`中(缺失会导致运行出错)，开发依赖应该放在`devDependencies`中，这样可以不浪费用户资源，自己的开发团队也能一键部署开发环境。


| dependencies | devDependencies | 发布到npm | 自己项目用 |
|--------------|-----------------|----------|------------|
| 生产依赖      |  开发依赖        | -        | -          |
| 生产依赖、开发依赖 | - | 浪费大量用户资源 | 浪费生产环境资源 |
| - | 生产依赖、开发依赖 | 用户无法正常运行 | 浪费生产环境资源、需要用奇怪的方式部署 |
| 开发依赖 | 生产依赖 | 浪费大量用户资源、用户无法正常运行 | 需要用奇怪的方式部署 |

## 参考资料
http://blog.sina.com.cn/s/blog_986896ff0102xe7q.html      
https://segmentfault.com/q/1010000007740149       
https://www.cnblogs.com/wonyun/p/9692476.html       
https://www.jb51.net/article/125143.htm?utm_medium=referral     
https://www.cnblogs.com/so-letitgo/p/6393247.html       

