var express = require('express');
var http = require('http');
var app = express();
app.set('view engine', 'jade'); // 设置模板引擎
app.set('views', __dirname);  // 设置模板相对路径(相对当前目录)

app.get('/', function(req, res) {
    res.render('test'); // 调用当前路径下的 test.jade 模板
})

var server = http.createServer(app);
server.listen(3002);
console.log('server started on http://127.0.0.1:3002/');