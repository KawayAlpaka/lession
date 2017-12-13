if(typeof module != "undefined"){
    var handler = require('./handler');
}
function Foo(){
    return new Proxy(this,handler);
}
var foo = new Foo();
foo.a = 1;
foo["b"] = 2;
console.log(foo);
console.log(foo.cc);

