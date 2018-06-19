import {name as name1} from "./module-a.mjs";
import {name as name2} from "./module-b.mjs";

function Hello(name){
  console.log("Hello " + name);
}
export {
  Hello,
  name1,
  name2
}