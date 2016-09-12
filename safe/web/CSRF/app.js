var https = require('https');
var http = require('http');
var express = require('express');
var app = express();

app.use(express.static('www'));
app.use(function (req, res, next) {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With ,mSession,Cookie , aaa');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS, PATCH, HEAD');
    if (req.method == 'OPTIONS') {
        res.sendStatus(200);//让options请求快速返回/
    } else {
        next();
    }
});


var httpServer1 = http.createServer(app).listen(5050, function () {
    var host = httpServer1.address().address;
    var port = httpServer1.address().port;
    console.log('ride listening at http://%s:%s', host, port);
    process.on('uncaughtException', function (err) {
        console.log('Caught exception: ', err.stack);
    });
});

var httpServer2 = http.createServer(app).listen(5051, function () {
    var host = httpServer2.address().address;
    var port = httpServer2.address().port;
    console.log('ride listening at http://%s:%s', host, port);
    process.on('uncaughtException', function (err) {
        console.log('Caught exception: ', err.stack);
    });
});