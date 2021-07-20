"use strict";
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



var getName = function(){
    return this.name;
};
var getType = function(){
    return this.type;
};
// 基于构造函数的继承
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

// 基于原型链的继承
var Parent2 = function(){
    this.name = "parent";
    this.arr = [1,2,3];
};
Parent2.prototype.getName = getName;
var Child2 = function(){
    this.type = "type";
};
Child2.prototype = new Parent2();
Child2.prototype.getType = getType;


// 构造函数+原型链的继承法
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


// 构造函数+原型链的继承法 优化1
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


// 构造函数+原型链的继承法 优化2
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


// 构造函数+原型链的继承法 优化3。
// 我的方案，虽然方案2也能通过测试用例，但它最后强行给构造函数赋值的方法可能会有遗漏,因为可能不只是 constructor 需要赋值。
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

// ES6 class 方案 测试一下看看
var Parent7 = class{
    static _data = "parent data";
    static getData(){
        return this._data;
    }
    constructor(){
        this.name = "parent";
        this.arr = [1,2,3];
    }
    getName(){
        return this.name;
    }
};
var Child7 = class extends Parent7{
    static _data = "child data";
    constructor(){
        //必须执行super();
        super();
        this.type = "type";
    }
    getType(){
        return this.type;
    }
};
// console.log(Parent7.getData());
// console.log(Child7.getData());

var cases = [
    {id:"1",caseName:"构造函数继承法",Parent:Parent1,Child:Child1},
    {id:"2",caseName:"原型链继承法",Parent:Parent2,Child:Child2},
    {id:"3",caseName:"构造函数+原型链的继承法",Parent:Parent3,Child:Child3},
    {id:"4",caseName:"构造函数+原型链的继承法 优化1",Parent:Parent4,Child:Child4},
    {id:"5",caseName:"构造函数+原型链的继承法 优化2",Parent:Parent5,Child:Child5},
    {id:"6",caseName:"构造函数+原型链的继承法 优化3",Parent:Parent6,Child:Child6},
    {id:"7",caseName:"ES6 class",Parent:Parent7,Child:Child7},
];
for(let i=0;i<cases.length;i++){
    let _i = i;
    TestExtends(_i,cases[i]);
}
