import {
    getIndex,
    obj,Foo} from "./common";
import {MyTestableClass} from "./es7";
console.log(require("./common"));
console.log("index/login:");
console.log(getIndex());
console.log(obj);


let foo = new Foo();
console.log(foo.getString());


