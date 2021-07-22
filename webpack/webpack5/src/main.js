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




const insertImg = (imageFile)=>{
	const img = new Image()
	img.src = imageFile;
	document.body.appendChild(img);
}
import lineImg from "./image/line.png";
import lineLiteImg from "./image/line-lite.png";
insertImg(lineImg);
insertImg(lineLiteImg);



import moment from "moment"
import "moment/locale/zh-cn"
moment.locale("zh-cn");
console.log(moment.months());

if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
			navigator.serviceWorker.register('/service-worker.js').then(registration => {
			console.log('SW registered: ', registration);
			}).catch(registrationError => {
			console.log('SW registration failed: ', registrationError);
			});
	});
}
