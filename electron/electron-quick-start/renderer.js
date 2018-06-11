// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
require("./renderer-process/open");
require("./renderer-process/menu");
require("./renderer-process/msg-a");
require("./renderer-process/notification");
require("./renderer-process/link");
require("./renderer-process/clipboard");


var BrowserWindow = require("electron").remote.BrowserWindow;

var pdf = require("./main-process/pdf");
var btnPrintPdf = document.querySelector("#print-pdf");
btnPrintPdf.addEventListener("click",function(){
    var focusedWin = BrowserWindow.getFocusedWindow();
    pdf.printToPDF(focusedWin);
});