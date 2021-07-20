# 6种ES5继承的实现方式
## 准备
### 在开始之前，先完成测试方法，
```js
/**
 * 函数会根据输入的子类和父类输进行测试，过程中输出测试结果
 * 输入的父类需要具有name属性和getName方法，以及 arr 数组
 * 输入的子类需要具有type属性和getType方法
 * 父子类具有继承关系
* @param {number | string} i  测试序号
* @param {{ Child:Function,Parent:Function }} testCase  测试序号
*/
var TestExtends = function(i,testCase){
    var Child = testCase.Child;
    var Parent = testCase.Parent;
    var p1 = new Parent();
    var c1 = new Child();

    console.log(testCase.id  + "-" + testCase.caseName + ":");
    var pass = true;

    //默认的name相同,并且拥有了Parent的getName方法
    if(p1.getName() != c1.getName()){
        console.error(`Error name默认值不同:p1.getName=${p1.getName()},c1.getName=${c1.getName()}`);
        pass = false;
    }

    //修改p1的name后,c1的name不应该跟着改变
    p1.name = "name2";
    if(p1.getName() == c1.getName()){
        console.error(`Error c2的name跟着改变了:p1.getName=${p1.getName()},c1.getName=${c1.getName()}`);
        pass = false;
    }

    //修改c1的arr后,p1的arr不应该跟着改变
    c1.arr.push(5);
    if(c1.arr.length == p1.arr.length){
        console.error(`Error p1的arr跟着改变了:c1.arr=${c1.arr},p1.arr=${p1.arr}`);
        pass = false;
    }

    //p1不应该有getType方法
    if(p1.getType){
        console.error(`Error p1有getType方法:p1.getType=${p1.getType}`);
        pass = false;
    }

    // p1应该不是Child的实例
    if(p1 instanceof Child){
        console.error(`Error p1是Child的实例:p1 instanceof Child=${p1 instanceof Child}`);
        pass = false;
    }
    // c1应该是Parent的实例
    if(!(c1 instanceof Parent)){
        console.error(`Error c1不是Parent的实例:c1 instanceof Parent=${c1 instanceof Parent}`);
        pass = false;
    }
    
    // c1 的 直接构造函数应该是 Child
    if(c1.constructor != Child){
        console.error(`Error c1 的 直接构造函数不是 Child:c1.constructor=${c1.constructor}`);
        pass = false;
    }

    
    if(pass){
        console.log("pass");
    }
};
```

### 实现getName和getType，后面直接引用 
```js
var getName = function(){
    return this.name;
};
var getType = function(){
    return this.type;
};
```

## 具体实现
### 基于构造函数的继承
代码
```js
var Parent1 = function(){
    this.name = "parent";
    this.arr = [1,2,3];
    this.getName = getName;
};
var Child1 = function(){
    Parent1.apply(this);
    this.type = "type";
    this.getType = getType;
};
```

测试结果:
```
Error c1不是Parent的实例:c1 instanceof Parent=false
```


### 基于原型链的继承
代码
```js
var Parent1 = function(){
    this.name = "parent";
    this.arr = [1,2,3];
    this.getName = getName;
};
var Child1 = function(){
    Parent1.apply(this);
    this.type = "type";
    this.getType = getType;
};
```

测试结果:
```
Error c1 的 直接构造函数不是 Child:c1.constructor=function(){
    this.name = "parent";
    this.arr = [1,2,3];
}
```

### 构造函数+原型链的继承法
代码
```js
var Parent3 = function(){
    this.name = "parent";
    this.arr = [1,2,3];
};
Parent3.prototype.getName = getName;
var Child3 = function(){
    Parent3.apply(this);
    this.type = "type";
};
Child3.prototype = new Parent3();
Child3.prototype.getType = getType;
```

测试结果:
```
Error c1 的 直接构造函数不是 Child:c1.constructor=function(){
    this.name = "parent";
    this.arr = [1,2,3];
}
```


### 构造函数+原型链的继承法 优化1
代码
```js
var Parent4 = function(){
    this.name = "parent";
    this.arr = [1,2,3];
};
Parent4.prototype.getName = getName;
var Child4 = function(){
    Parent4.apply(this);
    this.type = "type";
};
Child4.prototype = Parent4.prototype;
Child4.prototype.getType = getType;
```

测试结果:
```
Error p1有getType方法:p1.getType=function(){
    return this.type;
}
Error p1是Child的实例:p1 instanceof Child=true
Error c1 的 直接构造函数不是 Child:c1.constructor=function(){
    this.name = "parent";
    this.arr = [1,2,3];
}
```


### 构造函数+原型链的继承法 优化2
代码
```js
var Parent5 = function(){
    this.name = "parent";
    this.arr = [1,2,3];
};
Parent5.prototype.getName = getName;
var Child5 = function(){
    Parent5.apply(this);
    this.type = "type";
};
Child5.prototype = Object.create(Parent5.prototype);
Child5.prototype.getType = getType;
Child5.prototype.constructor = Child5;
```

测试结果:
```
pass
```

### 构造函数+原型链的继承法 优化3
代码
```js
var Parent6 = function(){
    this.name = "parent";
    this.arr = [1,2,3];
};
Parent6.prototype.getName = getName;
var Child6 = function(){
    Parent6.apply(this);
    this.type = "type";
};
Child6.prototype.getType = getType;
Child6.prototype.__proto__ = Parent6.prototype;
```

测试结果:
```
pass
```


## 测试代码
在源码中有

