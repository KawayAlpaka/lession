console.log("open.js");
var path = require("path");
var BrowserWindow = require("electron").remote.BrowserWindow;
var opens = document.querySelectorAll(".open");
var openBrowserWindow = function(url){
    var win = new BrowserWindow({
        frame:false
    });
    win.on("error",(...args)=>{
        console.log("win error");
        console.log(args);
        // win = null;
    });
    win.on("close",()=>{
        console.log("win colse");
        win = null;
    });
    win.on("closed",()=>{
        console.log("win colsed");
        win = null;
    });
    win.loadURL(url);
    return win;
};
opens.forEach((ele)=>{
    ele.addEventListener("click",(e)=>{
        var url = e.target.attributes.open.value;
        // window.open(url);
        openBrowserWindow(url);

    });
});

openModal.addEventListener("click",function(){
    var url = path.join("file:",__dirname,"../pages/modal.html")
    var win = openBrowserWindow(url);
    console.log(win);
    // open(url);
});