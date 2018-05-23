// const { BrowserWindow} = require("electron").remote;
const path = require("path");
const fs = require("fs");
const {shell} = require("electron");
const os = require("os");



var printToPDF = function(win){
    // var win = new BrowserWindow();
    const pdfPath = path.join(os.tmpdir(),"myapp.pdf");
    win.webContents.printToPDF({},(err,data)=>{
        if(err){
            console.error(err);
            return;
        }
        fs.writeFile(pdfPath,data,(error)=>{
            if(error){
                console.error(error);
                return;
            }
            shell.openExternal("file://"+pdfPath);
        });
    });
};

module.exports = {
    printToPDF:printToPDF
};