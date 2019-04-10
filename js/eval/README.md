# 为什么要少用eval?
eval是js中一个强大的方法。都说`eval == evil`等于`true`，这篇文章将研讨eval的几个缺点和使用注意事项。
## 目录
* [安全性](#security)
* [运行效率](#speed)
* [作用域](#scope)
* [内存](#momery) ▲ 
* [总结和应对方案](#result)
## <span id="security">安全性</span>
太明显了，暂不讨论
## <span id="speed">运行效率</span>
都知道eval比较慢，到底慢多少，自己测测看，下面是代码（对比运行 1万次`eval("sum++")`和 500万次`sum++`所需要的时间）
```javascript
var getTime = function(){
  // return Date.now();
  return new Date().getTime()     //兼容ie8
}
var sum;
// 测试 1万次 eval("sum++")
sum = 0;
var startEval = getTime();
for(var i = 0;i<10000;i++){
  eval("sum++");
}
var durEval = getTime() - startEval;
console.log("durEval = ",durEval,"ms");
// 测试 500万次 sum++
sum = 0;
var startCode = getTime();
for(var i = 0;i<5000000;i++){
  sum++;
}
var durCode = getTime() - startCode;
console.log("durCode = ",durCode,"ms");
//输出结果
console.log('直接运行 sum++ 的速度约是 运行 eval("sum++") 的',(durEval * 500 / durCode).toFixed(0),'倍');
```
#### 测试结果
在同一台PC上，测试3款浏览器和nodejs环境，结果如下：  

Chrome 73
```
durEval =  236 ms
durCode =  14 ms
直接运行 sum++ 的速度约是 运行 eval("sum++") 的 8429 倍
```
Firefox 65
```
durEval =  766 ms
durCode =  167 ms
直接运行 sum++ 的速度约是 运行 eval("sum++") 的 2293 倍
```
IE8
```
durEval = 417ms
durCode = 572ms
直接运行 sum++ 的速度约是 运行 eval("sum++") 的365倍
```
Nodejs 10.15.0
```
durEval =  5 ms
durCode =  14 ms
直接运行 sum++ 的速度约是 运行 eval("sum++") 的 179 倍
```

Chrome 的 V8 果然是王者，Firefox 在运行`eval`的PK上输给了古董IE8，node环境中`eval`的表现最好（只慢100多倍）

## <span id="scope">作用域</span>
在作用域方面，`eval`的表现让人费解。**直接调用时：当前作用域；间接调用时：全局作用域**。
#### 直接调用
`eval`被直接调用并且调用函数就是`eval`本身时，作用域为当前作用域，`function`中的`foo`被修改了，全局的`foo`没被修改。
```javascript
var foo = 1;
function test() {
    var foo = 2;
    eval('foo = 3');
    return foo;
}
console.log(test());    // 3
console.log(foo);       // 1
```
#### 间接调用
间接调用`eval`时 执行的作用域为全局作用域，两个`function`中的`foo`都没有被修改，全局的`foo`被修改了。     
```javascript
var foo = 1;
(function(){
  var foo = 1;
  function test() {
      var foo = 2;
      var bar = eval;
      bar('foo = 3');
      return foo;
  }
  console.log(test());    // 2
  console.log(foo);       // 1
})();
console.log(foo);         // 3
```

## <span id="momery">内存 ▲ </span>
使用`eval`会导致内存的浪费，这是本文要讨论的重点。
下面用测试结果来对比，**使用eval** 和 **不使用eval** 的情况下，以下代码内存的消耗情况。    
### 不用eval的情况
```javascript
var f1 = function(){          // 创建一个f1方法
  var data = {name:"data",data: (new Array(50000)).fill("data 111 data")}; // 创建一个不会被使用到的变量
  var f = function(){                      // 创建f方法然后返回
    console.log("code:hello world");
  };
  return f;
};
var F1 = f1();
```
#### 测试结果

在Chrome上查看内存使用情况，`开发者工具`->`Momery`->`Profiles`->`Take snapshot`，给内存拍个快照。     

<img src="https://raw.githubusercontent.com/KawayAlpaka/lession/master/js/eval/doc/img/use_tool.png">   

为了便于查找，在过滤器中输入`window`，查看当前域的`window`：      

<img src="https://raw.githubusercontent.com/KawayAlpaka/lession/master/js/eval/doc/img/code_momery_1.png">   

可以看到，`window`占用了`68612`，`2%`的内存。然后在其中找`F1`变量：

<img src="https://raw.githubusercontent.com/KawayAlpaka/lession/master/js/eval/doc/img/code_momery_2.png">  

`F1`占用了`32`，`0%`的内存。    

这似乎说明不了什么。没有对比就没有伤害，下面我们来伤害一下`eval`。    

### 使用eval的情况
修改上面的代码，把 `console.log` 修改为 `eval` 运行：
```diff
- console.log("code:hello world");
+ eval('console.log("eval:hello world");');
```
#### 测试结果

方法同上。在Chrome上查看内存使用情况，`开发者工具`->`Momery`->`Profiles`->`Take snapshot`。   

<img src="https://raw.githubusercontent.com/KawayAlpaka/lession/master/js/eval/doc/img/eval_momery_1.png">   

`window`占用了`251048`，`4%`的内存，其中`F1`占用了`200140`，相当于总量的`3%`的内存，`F1.context.data`，占用了`200044`，约等于`F1`的占用量，可见这些额外的内存开销都是来自于`F1.context.data`。

#### 分析     

使用eval时：`F1`占用了`200140`，`3%`的内存；      
不用eval时：`F1`占用了`32`，`0%`的内存；    

这样的差别来自于javascript引擎的优化。在方法`f1`运行时创建了`data`，接着创建了一个方法`f`，`f`中可以访问到`data`，但它没有使用`data`，然后`f`被返回赋值给变量`F1`，经过javascript引擎优化，这时`data`不会被加入到闭包中，同时也没有其他指针指向`data`，`data`的内存就会被回收。然而在`f`中使用了`eval`后，情况就不同了，`eval`太过强大，导致javascript引擎无法分辨`f`会不会使用到`data`，从而只能将全部的环境变量（包括`data`），一起加入到闭包中，这样`F1`就间接引用了`data`，`data`的内存就不会被回收。从而导致了额外的内存开销。

我们可以进一步测试，这时在`开发者工具`->`Console` 中输入：
```javascript
F1 = "Hello"  //重设F1,这样就没什么引用到data了
```
然后用同样的方法查看内存，可以发现 `window`占用的内存，从`200000+`下降到了`60000+`。

说到这里，再回头看`eval`奇怪的作用域。**直接调用时：当前作用域；间接调用时：全局作用域**，也就可以理解了。当间接调用时，javascript引擎不知道它是`eval`，优化时就会移除不需要的变量，如果`eval`中用到了那些变量，就会发生意想不到的事情。这违背了闭包的原则，变得难以理解。索性把间接调用的作用域设置为了全局。

## <span id="result">总结和应对方案</span>

#### 安全性
分析：`eval`是否安全主要由数据源决定，如果数据源不安全，`eval`只是提供了一种攻击方法而已。    
方案：严格管控数据源。    
#### 运行效率
分析：`eval`比直接运行慢很多倍，但主要的消耗在于编译代码过程，简单项目中，不会这样高频率的运行`eval`。    
方案：低频使用时影响不大，不要高频使用，建议寻找替代方案。    
#### 作用域
分析：实际项目中直接调用都很少，间接调用更是少之又少。    
方案：了解直接调用和间接调用的区别，遇到问题时不要懵逼即可。    
#### 内存     
分析：实际应用中很常见，却很少有人会注意到内存管理，大项目中被重复使用会浪费较多的内存。    
方案：优化编码规范，使用`eval`时注意那些没有被用到局部变量。    


原文链接：<a href="https://github.com/KawayAlpaka/lession/blob/master/js/eval/README.md" target="_blank">github</a>
