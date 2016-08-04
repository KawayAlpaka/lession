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

