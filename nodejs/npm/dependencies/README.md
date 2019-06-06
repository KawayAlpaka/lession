一直纠结，`dependencies` 和 `devDependencies` 有什么区别？我使用的包应该放到什么地方？上网找资料，大神群咨询。得到的答案是：      
* 生产环境用到的放在 `dependencies`中;      
* 开发环境用到的放在 `devDependencies`中;       
* 这是规范，遵守就能一起玩，不遵守就自己玩;      

Emmm...大神就是喜欢说一些菜逼听不懂的话。但我就是想知道：如果我不遵守，会怎么样？    

提出这个问题的朋友应该都发现：无论放到`dependencies`中，还是`devDependencies`，`npm install`时都会安装，没有差别，团队合作也OK，照玩不误啊。什么叫只能自己玩？把`koa`放到`devDependencies`中有没有问题？把`webpack`放到`dependencies`又会怎么样？      

直到自己在`npm`上发布了 `package` 才明白了大神的意思。     

## 生产环境 or 开发环境？   
**我**使用`vue`开发`web`项目的环境，是什么环境？    
答案是开发环境，但同时也是生产环境。    
**开发环境**是相对于**我的项目**来说的，相对**vue**，这个环境就是**生产环境**。   

## 从实践中理解两者的区别
用开源项目 [debug](https://github.com/visionmedia/debug) 项目举例。它的 `package.json` 内容如下：
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
### 使用debug (npm install debug)   
我们在使用`debug`时，需要这样用（也是大部分用户的使用方式）   

手动创建一个项目      
```shell
npm init
npm install debug --save
```
查看 `node_modules` 目录中的内容
```
-- node_modules
  -- debug
  -- ms
``` 
发现 `npm` 只安装了 `debug` 和 `ms(debug的dependencies包含的package)`。     
因为现在的环境相对于`debug`来说，是生产环境，所以`npm`只安装了`debug`的生产依赖。   

### 开发debug (git clone debug)
作为 `debug` 项目的**开发者**或**二次开发者**，才会这样用。
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
  -- xo
  -- connect
  -- date-format
  -- ......一共653个package
```
发现 `npm` 安装了 `dependencies`、`devDependencies`以及`它们的dependencies`。   
因为现在的环境相对于`debug`来说，是开发环境，所以`npm`安装了`debug`的所有依赖，以及它们的生产依赖。   

## 结论（挑战规范，知其所以然）     

根据以上的实践分析，总结出一些**玩**法：    

1. 如果所有依赖包**都是开放环境**要用到的包，并且不会发布到`npm`让别人使用（如`webpack`打包完成后发布`dist`的前端项目），因为生产环境不再需要依赖这些包(甚至都不需要`nodejs`)，这时你把**依赖**放到哪里，完全**随你开心**。但为了避免有人说闲话，应该放到`devDependencies`中。    
2. 如果所有依赖包**都是生产环境**要用到的包，并且不会发布到`npm`让别人使用。如**web**项目常用的`express`和`koa`，是生产环境运行必须的包，你也可以随便放 **（惊不惊喜意不意外）**，在生产环境中，部署生产环境时使用`npm install`，一样会把所有包安装下来，不影响生产环境的运行。为了避免有人说闲话，还是要放到`dependencies`中。   
3. 如果既有开发依赖又有生产依赖，并且不会发布到`npm`让别人使用。你还是可以随便放。`npm install` 会安装所有包。但就会产生问题，**生产环境安装了开发环境的包**，这个问题会死人吗？不太清楚，但项目是可以运行的。要避免这些额外的消耗，就要区分两种包的位置。在生产环境中使用`npm install --production`，则只会安装`dependencies`中的依赖。外翻篇：如果你开心，也可以把**开发依赖**包放到`devDependencies`，**生产依赖**包放到`dependencies`，生产环境就用`npm install --only=dev`，这样只会安装`devDependencies`中的~~生产~~依赖。
4. 如果是一个要发布到`npm`的项目，生产依赖就**一定**要放在`dependencies`中（缺失会导致运行出错），开发依赖应该放在`devDependencies`中，这样可以不浪费用户资源，开发者也能一键部署开发环境。   

简单总结一下，当**生产依赖**和**开发依赖**分别放到不同位置时，会导致的问题：

|  玩法                        | dependencies     | devDependencies  | 作为npm包发布           | 自用项目 |
| --------------------------- |------------------|------------------|-----------------------|--------- |
| 规范                         | 生产依赖          |  开发依赖         | -                     | -       |
| 开发依赖放在dependencies中    | 生产依赖、开发依赖 | -                | 浪费大量用户资源       | 浪费生产环境资源 |
| 生产依赖放在devDependencies中 | -                | 生产依赖、开发依赖 | 用户无法正常运行       | 浪费生产环境资源、需要用奇怪的方式部署 |
| 反着放                       | 开发依赖          | 生产依赖          | 浪费大量用户资源、用户无法正常运行 | 需要用奇怪的方式部署 |

## 参考资料
http://blog.sina.com.cn/s/blog_986896ff0102xe7q.html      
https://segmentfault.com/q/1010000007740149       
https://www.cnblogs.com/wonyun/p/9692476.html       
https://www.jb51.net/article/125143.htm?utm_medium=referral     
https://www.cnblogs.com/so-letitgo/p/6393247.html       

