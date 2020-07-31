//自定义bind方法
// let log = console.log;//必须有一个这个，里面才能console.log 有点奇怪 // 2019-04-02 这句没有影响了,可能与node版本有关
let myBind = function () {
  let bind = function (o, ...args1) {
    // ★ 这句和下面那句并存时，会导致系统console.log失效 *node环境下
    // 并且会导致mocha执行出错
    // console.log("my bind"); // ★ 
    var self = this;
    return function (...args2) {
      var args;
      if (args1) {
        args = args1.concat(args2);
      } else {
        args = args2;
      }
      return self.apply(o, args);
    };
  };
  Function.prototype.bind = bind; // ★ 
  return bind;
};

if (typeof module != "null" && typeof module != "undefined") {
  module.exports = myBind;
}

if (typeof window == "object"){
  console.log(1);
  // myBind();
  console.log(2);
  var objA = {};
  objA.name = "A";
  objA.funcA = function (str1,str2) {
    this.message = str1 + str2;
    console.log(this.name + str1 + str2);
  };
  var objB = {};
  objB.name = "B";
  objA.funcA("你好","吗？");
  var funcA = objA.funcA.bind(objB);
  funcA("你好","吗？");
  var funcB = objA.funcA.bind(objB,"他好");
  funcB("吧？");

  var instant = new funcB("吗?");
  console.log(instant);
}
