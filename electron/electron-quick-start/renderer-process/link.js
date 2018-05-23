const {shell} = require("electron");

let btn = document.querySelector("#brower-open-baidu");

btn.addEventListener("click",()=>{
    console.log("click #brower-open-baidu");
    shell.openExternal("https://www.baidu.com")
});