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

var routerApi = require('./app/router/api');


app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.json({limit: '1mb'}));  //body-parser 解析json格式数据
app.use(bodyParser.urlencoded({            //此项必须在 bodyParser.json 下面,为参数编码
    extended: true
}));

app.use('/api', routerApi);

var server = app.listen(3030, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
    process.on('uncaughtException', function (err) {
        console.log('Caught exception: ', err.stack);
    });
});

require('./app/socket/io').createServer(server);

// //test
// var RobotNode = mongoose.model('RobotNode');
// var robotNode = new RobotNode({name:"haha"});
// robotNode.getParentList();