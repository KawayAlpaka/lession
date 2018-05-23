const {ipcRenderer,remote} = require("electron");
const BrowserWindow = remote.BrowserWindow;

console.log("modal.js");

ipcRenderer.on("modal",(e,winId,args)=>{
    console.log("winId:",winId);
    console.log("args:",args);
    var win = BrowserWindow.fromId(winId);
    win.webContents.send("back",{name:"modal"})

});