var express = require('express');
var app = express();
var routerHome = require('./router/home');

app.use('/home', routerHome);


app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.use('*',function (req, res) {
    res.send('Hello 404');
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});