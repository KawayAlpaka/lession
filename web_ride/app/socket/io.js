var socketIo = require('socket.io');
var _ = require('underscore');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Session = mongoose.model('Session');

var sockets = [];
var findSocket = function (socket) {
    return sockets.find(function (socketObj) {
        return socketObj.socket == socket;
    })
};
var sendToAllAboutCount = function () {
    sockets.forEach(function(socketObj){

        if(socketObj.editingProject == null){
            //跳过
        }else{
            var list = _.filter(sockets,function (obj) {
                return obj.editingProject == socketObj.editingProject;
            });
            list.forEach(function (obj) {
                obj.socket.emit('workingOnProjectCount', { count: list.length });
            });
        }

        if(socketObj.editingNode == null){
            //跳过
        }else{
            var list = _.filter(sockets,function (obj) {
                return obj.editingNode == socketObj.editingNode;
            });
            list.forEach(function (obj) {
                obj.socket.emit('workingOnNodeCount', { count: list.length });
            });
        }

    });
};
module.exports.createServer = function (server) {
    var io = socketIo(server);
    io.on('connection', function (socket) {
        sockets.push({
            socket:socket,
            session:null,
            editingNode:null,
            editingProject:null
        });
        socket.emit('news', { hello: 'world' });
        var sendNews = function () {
            socket.emit('news', { hello: sockets.length });
            setTimeout(sendNews,5000);
        };
        sendNews();
        socket.on('my other event', function (data) {
            // console.log(data);
        });
        socket.on('editingProject', function (data) {
            findSocket(socket).editingProject = data.node;
            var currentProjectList = _.filter(sockets,function (socketObj) {
                return socketObj.editingProject == data.node;
            });
            currentProjectList.forEach(function (socketObj) {
                socketObj.socket.emit('workingOnProjectCount', { count: currentProjectList.length });
            });
        });
        socket.on('editingNode', function (data) {
            findSocket(socket).editingNode = data.node;
            var currentNodeList = _.filter(sockets,function (socketObj) {
                return socketObj.editingNode == data.node;
            });
            currentNodeList.forEach(function (socketObj) {
                socketObj.socket.emit('workingOnNodeCount', { count: currentNodeList.length });
            });
        });
        socket.on('leaveWorkspace', function (data) {
            var socketObj = findSocket(socket);
            socketObj.editingNode = null;
            socketObj.editingProject = null;
            sendToAllAboutCount();
        });
        socket.on('c-mSession', function (data) {
            if(data.mSession){
                Session.findOne(data.mSession,function (err,session) {
                    var index = sockets.findIndex(function (value) {
                        return value.socket == socket;
                    });
                    sockets[index].session = session;
                    socket.emit('s-user', { user: session.user });
                });
            }
        });
        socket.on('disconnect', function() {
            sockets.splice(sockets.findIndex(function (value) {
                return value.socket == socket;
            }), 1);
        });
    });
};