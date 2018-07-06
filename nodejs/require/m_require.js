//简单实现 require 
const fs = require("fs");
var r = function(path){
  var code = fs.readFileSync(path+".js",{encoding:"utf-8"});
  var module = {};
  (function(){
    eval(code);
  })();
  return module.exports;
};
module.exports = r;