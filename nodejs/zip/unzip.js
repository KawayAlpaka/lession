"use strict";
var fs = require("fs");
var unzip = require("unzip");

// 方案1 成功
var readStream = fs.createReadStream('F:/robot/workspace/sample.zip');
readStream.pipe(unzip.Extract({ path: 'F:/robot/workspace/hehe' })).on('close', function () {
    console.log("close");
});
console.log("run");

// // 方案2 报错
// var readStream = fs.createReadStream('F:/robot/workspace/sample.zip');
// var writeStream = fstream.Writer('F:/robot/workspace/hehe');
//
// readStream
//     .pipe(unzip.Parse())
//     .pipe(writeStream);
//
// readStream.on('close', function () {
//     console.log("readStream close");
// });
// writeStream.on('close', function () {
//     console.log("writeStream close");
// });
// console.log("run");

// // 方案3  没解压
// fs.createReadStream('F:/robot/workspace/sample.zip')
//     .pipe(unzip.Parse())
//     .on('entry', function (entry) {
//         var fileName = entry.path;
//         var type = entry.type; // 'Directory' or 'File'
//         var size = entry.size;
//         if (fileName === "this IS the file I'm looking for") {
//             entry.pipe(fs.createWriteStream('F:/robot/workspace/hehe'));
//         } else {
//             entry.autodrain();
//         }
//     });