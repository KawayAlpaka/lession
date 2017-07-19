//服务器及页面响应部分
var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server); //引入socket.io模块并绑定到服务器


var mongoose = require('mongoose');
// var mongoStore = require('connect-mongo')(express);
var dbUrl = 'mongodb://localhost/chat';
// var db = mongoose.connect(dbUrl);
var db = mongoose.createConnection(dbUrl);

db.on('error',console.error.bind(console,'连接错误:'));
db.once('open',function(){
    console.log("打开数据库成功");
    //一次打开记录
    var PersonSchema = new mongoose.Schema({
        name:String   //定义一个属性name，类型为String
    });
    //为Schema模型追加speak方法
    PersonSchema.methods.speak = function(){
        console.log('我的名字叫'+this.name);
    };
    var PersonModel = db.model('Person',PersonSchema);
    var personEntity = new PersonModel({name:'Krouky'});
    personEntity.speak();//我的名字叫Krouky
    console.log(personEntity);
    personEntity.save();
});







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
            who:data.who,
            text:data.text
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