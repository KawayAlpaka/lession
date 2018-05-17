//自定义bind方法
// let log = console.log;//必须有一个这个，里面才能console.log 有点奇怪
let myBind = function(){
    let bind = function(o,...args1){
        // console.log("my bind");
        var self = this;
        return function(...args2){
            var args;
            if(args1){
                args = args1.concat(args2);
            }else{
                args = args2;
            }
            self.apply(o,args);
        };
    };
    Function.prototype.bind = bind;
};
// myBind();

var objA = {};
objA.name = "A";
objA.funcA = function (str1,str2) {
    console.log(this.name + str1 + str2)
};

var objB = {};
objB.name = "B";
objA.funcA("你好","吗？");
var funcA = objA.funcA.bind(objB);
funcA("你好","吗？");
var funcB = objA.funcA.bind(objB,"他好");
funcB("吧？");

