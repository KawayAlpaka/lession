const path = require("path");

let option = {
    title:"title",
    body:'body',//不支持html
    icon:path.join("file:",__dirname,"../main-process/icon.png")
};

let notification = new window.Notification(option.title,option);
notification.addEventListener("click",()=>{
    console.log("click notification");
});