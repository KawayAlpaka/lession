//简单实现 require 
const fs = require("fs");
var r = function(path){
  var code = fs.readFileSync(path+".js",{encoding:"utf-8"});
  var module = {};
  (function(){
    // eval 动态执行方案
    // eval(code);
    // Function 动态执行方案
    var f = new Function("module",code);
    f(module);
  })();
  return module.exports;
};
module.exports = r;