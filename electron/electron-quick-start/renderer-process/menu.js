const ipc = require("electron").ipcRenderer;

const menu = document.querySelector("#menu");

var showMenu = function(){
    console.log("showMenu");
    ipc.send("show-context-menu");
}

menu.addEventListener("click",showMenu);

document.addEventListener("contextmenu",showMenu)