if(typeof module != "undefined"){
    var handler = require('./handler');
}
var obj = new Proxy({}, handler);
obj.a = 1;
obj["b"] = 2;
console.log(obj);
console.log(obj.cc);