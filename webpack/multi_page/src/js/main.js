import "../scss/style.scss";
import {
    getIndex,
    obj} from "./common";
import {MyTestableClass} from "./es7";
import {Person,Boy} from "./es6";
import {env} from "env";
console.log(require("./common"));
console.log("index/login:");
console.log(getIndex());
console.log(obj);

console.log(env);

let person = new Person("黄");
console.log(person);
let boy = new Boy("王",15);
console.log(boy);
console.log(Boy.getString());


