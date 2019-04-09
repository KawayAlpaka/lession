## JS闭包中到底有什么?   
闭包的作用是让块级作用域中可以访问父级作用域中定义的变量；并不是隐藏块级作用域的中定义的变量，让外部无法访问。    
已有很多大牛讨论过闭包的原理，这里不再班门弄斧，仅研究闭包（Closure）中包含的数据内容      
先来看看百度百科的描述：    
```
闭包包含自由（未绑定到特定对象）变量，这些变量不是在这个代码块内或者任何全局上下文中定义的，而是在定义代码块的环境中定义（局部变量）    ---百度百科
```    
根据以上描述，可以得到通俗的结论：
```
1、闭包中不包含全局变量;                           // 以下简称 全局变量
2、闭包中不包含本代码块中定义的变量;                // 以下简称 内部变量
3、闭包包含的是本代码块所在的环境中定义的局部变量;   // 以下简称 环境变量
```
### javascript例子1:   
```javascript
var G = "G";              // G 全局变量
var F = (function(){
  var a = "a";            // a 环境变量
  var f = function(b){    // b 参数(内部变量), f 环境变量
    console.log("G:",G);
    var c = "c";          // c 内部变量
    console.log("a:",a);
    console.log("b:",b);
    console.log("c:",c);
  }
  return f;
})();
console.log(window);
```
以上例子中 `G`、`F` 为全局变量；相对于定义 `f` 的代码块，`a`、`f` 为 环境变量；`b`、`c` 为 内部变量。   
代码执行完成后，`f` 被返回赋值给了 全局变量 `F`，然后在控制台中打印 全局对象 `window`。在开发者工具中检查 `window.F` 的内容。 

<img src="https://github.com/KawayAlpaka/lession/blob/master/js/Closure/img/example1-1.png?raw=true" >

图中的 `Closure` 即是闭包对象，其中包含 `a` 属性，值为 "a"，也就是环境变量 `a`。    
验证了上面的结论1和2：闭包中不包含全局变量(`G`、`F`)和内部变量(`b`、`c`)。奇怪的是 环境变量 `f` 却没有在`Closure`对象中。

### javascript例子2:   

对 例子1 进行修改：注释 `console.log("a:",a);`， 添加一行  `f;`，运行后检查 `window.F` 的内容。  

```javascript 
var G = "G";                    // G 全局变量
var F = (function(){
  var a = "a";                  // a 环境变量
  var f = function(b){          // b 参数(内部变量), f 环境变量
    console.log("G:",G);
    var c = "c";                // c 内部变量
    //console.log("a:",a);      // ★ 删除
    console.log("b:",b);
    console.log("c:",c);
    f;                          // ★ 新增
  }
  return f;
})();
console.log(window);
```

<img src="https://github.com/KawayAlpaka/lession/blob/master/js/Closure/img/example1-2.png?raw=true" >    

发现 `Closure` 中的 `a` 没了， `f` 出现了。   
### 结论：闭包中只包含方法中会用到的环境变量    
javascript引擎在用`function`创建方法时(`Function`则不同，暂时不讨论)，进行了优化，并不是无脑把环境变量一口闷入`Closure`中，而是只将方法中使用到的环境变量，加入到`Closure`中。不错，节约内存空间。    
PS:在特殊情况下，javascript无法预测方法内部使用了什么环境变量的情况下（如使用eval函数时），`Closure`中就会包含所有环境变量（甚至包括`arguments`），来保证闭包机制不受影响。    


原文链接:<a href="https://github.com/KawayAlpaka/lession/tree/master/js/Closure" target="_blank">github</a>
