console.log("open.js");
var path = require("path");
var BrowserWindow = require("electron").remote.BrowserWindow;
var {ipcRenderer} = require("electron")
var opens = document.querySelectorAll(".open");
var openBrowserWindow = function(url){
    var win = new BrowserWindow({
        frame:true
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
    // win.loadURL(url);
    return win;
};
opens.forEach((ele)=>{
    ele.addEventListener("click",(e)=>{
        var url = e.target.attributes.open.value;
        // window.open(url);
        var win = openBrowserWindow(url);
        win.loadURL(url);
    });
});

openModal.addEventListener("click",function(){
    var winId = BrowserWindow.getFocusedWindow().id;
    var url = path.join("file:",__dirname,"../pages/modal.html")
    var win = openBrowserWindow(url);
    win.webContents.on("did-finish-load",(event)=>{
        console.log("did-finish-load");
        win.webContents.send("modal",winId,{name:"Main"});
    });
    win.loadURL(url);
    // open(url);
});

ipcRenderer.on("back",(e,args)=>{
    console.log("args:", args);
});