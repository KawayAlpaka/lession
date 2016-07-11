var socketIo = require('socket.io');
var _ = require('underscore');
var exec = require('child_process').exec;
var fileHelper = require('../helper/file_helper');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var RobotNode = mongoose.model('RobotNode');
var Session = mongoose.model('Session');


console.log("init io");

var io;
var connections = [];

var findSocket = function (socket) {
    return connections.find(function (socketObj) {
        return socketObj.socket == socket;
    })
};
var sendToAllAboutCount = function () {
    connections.forEach(function(socketObj){

        if(socketObj.editingProject == null){
            //跳过
        }else{
            var list = _.filter(connections,function (obj) {
                return obj.editingProject == socketObj.editingProject;
            });
            list.forEach(function (obj) {
                obj.socket.emit('workingOnProjectCount', { count: list.length });
            });
        }

        if(socketObj.editingNode == null){
            //跳过
        }else{
            var list = _.filter(connections,function (obj) {
                return obj.editingNode == socketObj.editingNode;
            });
            list.forEach(function (obj) {
                obj.socket.emit('workingOnNodeCount', { count: list.length });
            });
        }

    });
};
module.exports.createServer = function (server) {
    io = socketIo(server);
    io.on('connection', function (socket) {
        connections.push({
            socket:socket,
            session:null,
            editingNode:null,
            editingProject:null
        });
        socket.emit('news', { hello: 'world' });
        var sendNews = function () {
            socket.emit('news', { hello: connections.length });
            setTimeout(sendNews,5000);
        };
        sendNews();
        socket.on('my other event', function (data) {
            // console.log(data);
        });
        socket.on('currentProject', function (data) {
            findSocket(socket).editingProject = data.node;
            var currentProjectList = _.filter(connections,function (socketObj) {
                return socketObj.editingProject == data.node;
            });
            currentProjectList.forEach(function (socketObj) {
                socketObj.socket.emit('currentProjectCount', { count: currentProjectList.length });
            });
        });
        socket.on('currentNode', function (data) {
            findSocket(socket).editingNode = data.node;
            var currentNodeList = _.filter(connections,function (socketObj) {
                return socketObj.editingNode == data.node;
            });
            currentNodeList.forEach(function (socketObj) {
                socketObj.socket.emit('currentNodeCount', { count: currentNodeList.length });
            });
        });
        socket.on('leaveWorkspace', function (data) {
            var socketObj = findSocket(socket);
            socketObj.editingNode = null;
            socketObj.editingProject = null;
            sendToAllAboutCount();
        });
        socket.on('debug', function (data) {
            console.log("启动调试");
            var nodeId = data.node;
            console.log(nodeId);
            var basePath = 'D:/debug/';
            RobotNode.findOne({_id: nodeId}, function (err, robotNode) {
                if (robotNode) {
                    var pNode = robotNode;
                    var projectPath = basePath + pNode._id;
                    fileHelper.createProjectFiles(pNode, projectPath, function () {
                        exec('pybot --outputdir '+projectPath+" "+projectPath + "/" + pNode.name,{},function(error,stdout,stderr){
                            if(error) {
                                console.info('stderr : '+stderr);
                            }
                            if(stdout.length >1){
                                socket.emit('debugResult', { result: stdout });
                            } else {
                                // console.log('you don\'t offer args');
                            }
                        });
                    });
                } else {
                }
            });
        });
        socket.on('c-mSession', function (data) {
            if(data.mSession){
                Session.findOne(data.mSession,function (err,session) {
                    var index = connections.findIndex(function (value) {
                        return value.socket == socket;
                    });
                    connections[index].session = session;
                    socket.emit('s-user', { user: session.user });
                });
            }
        });

        socket.on('disconnect', function() {
            connections.splice(connections.findIndex(function (value) {
                return value.socket == socket;
            }), 1);
        });
    });
};

module.exports.nodeUpdate = function (node) {
    io.sockets.emit("nodeUpdate",node);
};