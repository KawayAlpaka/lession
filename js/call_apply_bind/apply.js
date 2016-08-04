var objA = {};
objA.name = "A";
objA.funcA = function (str1,str2) {
    console.log(this.name + str1 + str2)
};

var objB = {};
objB.name = "B";
objA.funcA("你好","吗？");
objA.funcA.apply(objB,["你好","吗？"]);