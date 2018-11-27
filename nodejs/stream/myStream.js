var Stream = require('stream');
var Readable = Stream.Readable;
var Writable = Stream.Writable;
var ws = Writable();
ws._write = function (chunk, enc, next) {
    console.log(chunk.toString());  // 输出“流动”的数据
    next();  // 继续监听下一次输出
};

// 构造一个 readable
var rs = new Readable;
// rs.on("data",function(chunk){
//   console.log(chunk.toString());
// });
// rs.on("end",function(){
//   console.log("end");
// });
// pipe 到一个 writable stream
// rs.pipe(process.stdout);
rs.pipe(ws);
// stream 并往里“灌入”数据
rs.push('学习 ');
rs.push('nodejs ');
rs.push('stream');
rs.push(null);
