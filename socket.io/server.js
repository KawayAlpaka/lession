//服务器及页面响应部分
var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server); //引入socket.io模块并绑定到服务器
app.use('/', express.static(__dirname + '/www'));
server.listen(9090);

var sockets = [];
//socket部分
io.on('connection', function(socket) {
    //接收并处理客户端发送的foo事件
    // console.log(socket);
    socket.on('foo', function(data) {
        //将消息输出到控制台
        console.log(data);
        sendToAll({
            who:socket.id,
            text:data
        });
    });
    socket.on('disconnect', function() {
        //将断开连接的用户从users中删除
        sockets.splice(sockets.findIndex(function (value) {
            return value == socket;
        }), 1);
        //通知除自己以外的所有人
        io.sockets.emit('userCount',sockets.length);
    });

    sockets.push(socket);
    io.sockets.emit('userCount',sockets.length);
});



function sendToAll(data) {
    sockets.forEach(function (socket) {
        socket.emit('foo2',data);
    });
}



console.log("start server");