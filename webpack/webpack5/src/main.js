import "./less/style.less";
import { add } from "./common/common";

console.log("haha");

class Test{
	static _data = "hello world"
}

console.log(Test._data);
console.log("main",add(1,3));
if(IsHappy){
	console.log("happy")
}else{
	console.log("unhappy")
}

const button = document.createElement("button");
button.innerHTML = "test"
button.addEventListener("click",()=>{
	import("./common/lazy").then((lazy)=>{
		console.log(lazy);
		console.log(lazy.sub(10,5)); 
	});
	// 下面这种方式就直接打包了，不会懒加载
	// const lazy = require("./common/lazy")
	// console.log(lazy);
},false);
document.body.appendChild(button);
