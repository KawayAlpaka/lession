var http = require('http');
var fs = require('fs');
var path = require('path');

var server = http.createServer(function (req, res) {
    var returnByStream = function (fileName) {
        var stream = fs.createReadStream(fileName);
        stream.pipe(res); // 将 res 作为 stream 的 dest
    }
    var method = req.method;
    if (method === 'GET') {
        if(req.url == '/data'){
            var fileName = path.resolve(__dirname, './data/data.txt');
            // // 非流的方式
            // fs.readFile(fileName, function (err, data) {
            //     res.end(data);
            // });
            returnByStream(fileName);
        } else if (req.url == '/test') {
            //
        }else if (req.url == '/') {
            var fileName = path.resolve(__dirname, './www/index.html');
            returnByStream(fileName);
        } else {
            var fileName = path.resolve(__dirname, 'www',req.url);
            if(fs.existsSync(fileName)){
                returnByStream(fileName);
            } else {
                res.end('文件不存在');
            }
        }
    }
    if (method === 'POST') {
        // // 先获取,在保存
        // var dataStr = '';
        // var buff = new Buffer('');
        // req.on('data', function (chunk) {
        //     // 接收到部分数据
        //     buff = Buffer.concat([buff,chunk]);
        // });
        // req.on('end', function () {
        //     // 接收数据完成
        //     var fileName = path.resolve(__dirname, './data/post.txt');
        //     fs.writeFile(fileName, buff,function(){
        //         res.end('OK');
        //     });
        // });
        // 用管道保存
        var fileName = path.resolve(__dirname, './data/post.txt');
        var writeStream = fs.createWriteStream(fileName);
        req.pipe(writeStream);
        req.on('end', function () {
            res.end('OK');
        });
    }
});
server.listen(8000);