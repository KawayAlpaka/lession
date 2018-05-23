const {clipboard,nativeImage} = require("electron");

const path = require("path");

clipboard.writeText("haha");
clipboard.writeText("hehe");

console.log(clipboard.readText());

let filePath = path.join(__dirname,"../main-process/icon.png");
// console.log(filePath);
let img = nativeImage.createFromPath(filePath);

clipboard.writeImage(img);

let imgDataUrl = clipboard.readImage().toDataURL();

let imgTag = new Image();
imgTag.src = imgDataUrl;

document.body.appendChild(imgTag);