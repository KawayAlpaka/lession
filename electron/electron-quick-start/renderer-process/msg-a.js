const { ipcRenderer} = require("electron");

let msg_a_btn = document.querySelector("#msg_a")

msg_a_btn.addEventListener("click",()=>{
    let msg = ipcRenderer.sendSync("msg-a",{name:"peter"});
    console.log(msg);
});


ipcRenderer.on("msg-b",(event,...agrs)=>{
    console.log("Hello " + agrs[0].name);
    event.returnValue = "Hello " + agrs[0].name;
});