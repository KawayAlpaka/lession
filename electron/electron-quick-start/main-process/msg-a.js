const { ipcMain } = require("electron");

ipcMain.on("msg-a",(event,...agrs)=>{
    // console.log(event);
    // console.log(agrs);

    //同步返回数
    event.returnValue = "Hello " + agrs[0].name;

    //异步发送消息
    setTimeout(() => {
        let r = event.sender.send('msg-b', {name:"Ann"});
        console.log(r);
    }, 2000);
});