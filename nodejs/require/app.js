var m = require("./module");
console.log("hello "+ m.name);
var mRequire = require("./m_require");
var m2 = mRequire("./module");
console.log("hello m2 "+ m2.name);