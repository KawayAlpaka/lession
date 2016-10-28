var https = require('https');
var http = require('http');
var fs = require('fs');
var mongoose = require('mongoose');
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require("body-parser");
var app = express();
var env = require("./config/env");

mongoose.Promise = global.Promise; //升级mongoose默认Promise
if(env.db.user){
    mongoose.connect('mongodb://' + env.db.user.user + ':'+ env.db.user.pwd + "@" + env.db.host + ':' + env.db.port + '/' + env.db.database);
}else{
    mongoose.connect('mongodb://' + env.db.host + ':' + env.db.port + '/' + env.db.database);
}
mongoose.connection.on('error', function (err) {
    console.log(err);
});
mongoose.connection.on('connected', function () {
    console.log("mongoose.connection connected");
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


    switch (env.net.protocol){
        case "http":
            var httpServer = http.createServer(app).listen(env.net.port, function () {
                var host = httpServer.address().address;
                var port = httpServer.address().port;
                console.log('ride listening at http://%s:%s', host, port);
                // 处理异常临时方案，domian是后续方案
                // express错误处理中间件无法捕获异步的异常
                process.on('uncaughtException', function (err) {
                    console.log('Caught exception: ', err.stack);
                });
                mIo.createServer(httpServer);
            });
            break;
        case "https":
            var httpsOptions = {
                key: fs.readFileSync(env.net.ssl.key),
                cert: fs.readFileSync(env.net.ssl.cert),
                rejectUnauthorized: false
            };
            var httpsServer = https.createServer(httpsOptions,app).listen(env.net.port, function () {
                var host = httpsServer.address().address;
                var port = httpsServer.address().port;
                console.log(httpsServer.address());
                console.log('ride listening at https://%s:%s', host, port);
                process.on('uncaughtException', function (err) {
                    console.log('Caught exception: ', err.stack);
                });
                mIo.createServer(httpsServer);
            });
            break;
        default:
            console.log("dose not set net.protocol");
            break;
    }
    // // seed
    // var seed = require("./config/seed");
    // seed.start();
});