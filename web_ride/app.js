var https = require('https');
var http = require('http');
var fs = require('fs');
var mongoose = require('mongoose');
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require("body-parser");
var app = express();
mongoose.connect('mongodb://localhost/web_ride');
mongoose.Promise = global.Promise; //升级mongoose默认Promise

var User = require('./app/model/user');
var RobotNode = require('./app/model/robot_node');
var Project = require('./app/model/project');

var mIo = require('./app/socket/io');

var routerApi = require('./app/router/api');


app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.json({limit: '1mb'}));  //body-parser 解析json格式数据
app.use(bodyParser.urlencoded({            //此项必须在 bodyParser.json 下面,为参数编码
    extended: true
}));

app.use('/api', routerApi,function (err, req, res, next) {
    res.resFormat.data = err.stack;
    res.json(res.resFormat);
});

// // 原始版本
// var server = app.listen(3030, function () {
//     var host = server.address().address;
//     var port = server.address().port;
//     console.log('ride listening at http://%s:%s', host, port);
//     process.on('uncaughtException', function (err) {
//         console.log('Caught exception: ', err.stack);
//     });
// });
// mIo.createServer(server);

// http 版本
var httpServer = http.createServer(app).listen(3030, function () {
    var host = httpServer.address().address;
    var port = httpServer.address().port;
    console.log('ride listening at http://%s:%s', host, port);
});
mIo.createServer(httpServer);

// //https 版本
// var httpsOptions = {
//     key: fs.readFileSync('D:/ssl/privatekey.pem'),
//     cert: fs.readFileSync('D:/ssl/certificate.pem'),
//     rejectUnauthorized: false
// };
// var httpsServer = https.createServer(httpsOptions,app).listen(3031, function () {
//     var host = httpsServer.address().address;
//     var port = httpsServer.address().port;
//     console.log(httpsServer.address());
//     console.log('ride listening at https://%s:%s', host, port);
// });
// mIo.createServer(httpsServer);


// // seed
// var seed = require("./config/seed");
// seed.start();

// 处理异常临时方案，domian是后续方案
// express错误处理中间件无法捕获异步的异常
process.on('uncaughtException', function (err) {
    console.log('Caught exception: ', err.stack);
});