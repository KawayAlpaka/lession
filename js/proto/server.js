function Foo (){
    this.aaa = "aaa";
    this.bbb = function () {
        console.log(this.bbb)
    }
}
Foo.ccc = "ccc";
Foo.prototype.ddd = "ddd";
console.log(Foo.toString());
var object = Object;
console.log(object);
var foo = new Foo();
console.log(foo);
console.log(foo.prototype);
foo.prototype = {};
console.log(foo.prototype);
foo.prototype.ccc = "ccc";
foo.__proto__.ccc = "cccc";
console.log(foo.__proto__);
console.log(foo.__proto__.__proto__);
console.log("foo.__proto__.__proto__.__proto__");
console.log(foo.__proto__.__proto__.__proto__);
console.log("foo.__proto__.__proto__.__lookupGetter__");
console.log(foo.__proto__.__proto__.__lookupGetter__);
console.log(Object);
console.log(foo.ccc);
console.log(foo.ddd);

// foo.__lookupGetter__ = function () {
//    console.log("__lookupGetter__");
// };
console.log(foo.eee);

foo.__proto__.__defineGetter__("name",function(){return this.name1 + "get";});
foo.__proto__.__defineSetter__("name",function(name){this.name1 = name +"set";});
console.log(foo.__lookupGetter__("name").toString());
foo.name = "name";
console.log(foo.name);

foo.__proto__.__defineGetter__("*",function(){return "*";});
console.log(foo["zz"]);