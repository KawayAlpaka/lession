var mongoose = require('mongoose');
var express = require('express');
var cookieParser = require('cookie-parser');


mongoose.connect('mongodb://localhost/web_ride');

var User = require('./app/model/user');
var RobotNode = require('./app/model/robot_node');

var routerApi = require('./app/router/api');

var app = express();
app.use(express.static('public'));
app.use(cookieParser());
app.use(function (req, res, next) {
    next();
});
app.use('/api', routerApi);

var server = app.listen(3030, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});