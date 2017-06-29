var fs = require("fs");

// 创建一个可读流
var readerStream1 = fs.createReadStream('fs_extra.js');
var readerStream2 = fs.createReadStream('test1.js');

// 创建一个可写流
var writerStream = fs.createWriteStream('output.txt');

// 管道读写操作
readerStream1.pipe(writerStream);
readerStream1.on("end",function () {
    console.log("readerStream1 end");
});
readerStream2.pipe(writerStream);

readerStream2.on("end",function () {
    console.log("readerStream2 end");
});

console.log("程序执行完毕");