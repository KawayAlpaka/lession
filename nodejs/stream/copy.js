var fs = require('fs')
var path = require('path')

// 开始监控内存
var memeye = require('memeye')
memeye();

// 将拷贝操作封装到一个函数中
function copy() {
  var fileName1 = path.resolve(__dirname, 'data/data.txt');
  var fileName2 = path.resolve(__dirname, 'data/data-bak.txt')
  // 这里自行补充上文的拷贝代码
  // // 测试一，使用 readFile 和 writeFile 编写的拷贝代码
  // // 读取文件
  // fs.readFile(fileName1, function (err, data) {
  //   if (err) {
  //     // 出错
  //     console.log(err.message)
  //     return
  //   }
  //   // 得到文件内容
  //   var dataStr = data.toString()
  //   // 写入文件
  //   fs.writeFile(fileName2, dataStr, function (err) {
  //     if (err) {
  //       // 出错
  //       console.log(err.message)
  //       return
  //     }
  //     console.log('拷贝成功')
  //   })
  // });
  // 测试二，使用 stream 编写的拷贝代码
  var readStream = fs.createReadStream(fileName1)
  var writeStream = fs.createWriteStream(fileName2)
  // 执行拷贝，通过 pipe
  readStream.pipe(writeStream)
  // 数据读取完成，即拷贝完成
  readStream.on('end', function () {
      console.log('拷贝完成')
  })
}

// 延迟 5s 执行拷贝
setTimeout(function () {
    // 连续执行 100 次拷贝
    var i
    for (i = 0; i < 100; i++) {
        copy()
    }
}, 5000);