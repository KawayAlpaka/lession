const {app,globalShortcut,dialog} = require("electron");

app.on("ready",()=>{
    globalShortcut.register("ctrl+l",()=>{
        dialog.showMessageBox({
            title:"快捷键",
            message:"呵呵",
            type:"info",
            detail:"哈哈",
            buttons:["ok"]
        });
    });
});
app.on("will-quit",()=>{
    globalShortcut.unregisterAll();
});