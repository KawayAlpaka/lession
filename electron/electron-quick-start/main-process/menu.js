const { Menu,app,ipcMain,BrowserWindow} = require("electron")


let template = [
    {
        label:"1",
        click:()=>{
            console.log(1);
        },
        submenu:[
            {
                label:"2",
                click:()=>{
                    console.log(2);
                },
            }
        ]
    }
]

let menu = Menu.buildFromTemplate(template);

//设置菜单
// Menu.setApplicationMenu(menu);

// app.dock.setMenu(menu); //OSX
// app.setUserTasks([{
//     title: "新建窗口",
//     program :"",
//     arguments :"123123",
//     description  :"1231231",
//     iconPath  :"",
//     iconIndex :0
// }]);
// app.addRecentDocument("f://a.jpg");

ipcMain.on("show-context-menu",(e)=>{
    console.log("ipcMain.on show-context-menu");
    let win = BrowserWindow.fromWebContents(e.sender);
    menu.popup(win);
});