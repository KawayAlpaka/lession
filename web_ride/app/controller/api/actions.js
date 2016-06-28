var fs = require('fs-extra');
var Q = require("q");
var mongoose = require('mongoose');
var RobotNode = mongoose.model('RobotNode');

var actions = {};
actions.createProjectFiles = function (req, res) {
    var nodeId = req.params.id;
    RobotNode.find({_id: nodeId}, function (err, robotNodes) {
        if (robotNodes.length > 0) {
            //生成文件代码
            var pNode = robotNodes[0];
            var projectPath = 'D:\\test\\'+pNode._id;

            var removeOldFiles = function () {
                var deferred = Q.defer();
                fs.remove(projectPath, function (err) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    deferred.resolve();
                });
                return deferred.promise;
            };
            var createRootDir = function () {
                var deferred = Q.defer();
                fs.mkdir(projectPath, 0666, function (err) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    var data = {
                        path:projectPath,
                        node:pNode
                    };
                    deferred.resolve(data);
                });
                return deferred.promise;
            };
            
            var createDir = function (data) {

                console.log("createDir");
                var deferred = Q.defer();
                if( data.node.fileType == "dir" ) {
                    var dir = data.path + "\\" + data.node.name;
                    var nData = {
                        path: dir,
                        node:data.node
                    };
                    fs.mkdir(dir, 0666, function (err) {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        deferred.resolve(nData);
                    });
                }
                return deferred.promise;
            };
            var createInitFile = function (data) {
                var deferred = Q.defer();
                fs.writeFile(data.path + '/__init__.txt', "hahaha", {flag: 'w'}, function (err) {
                    if(err) {
                        console.error(err);
                    } else {
                        console.log('写入成功');
                        deferred.resolve(data);
                    }
                });
                return deferred.promise;
            };

            var createChildren = function (data) {
                data.node.children(function (err,children) {
                    children.forEach(function (child) {
                        var nData = {
                            path: data.path,
                            node:child
                        };
                        createDir(nData)
                            .then(createInitFile)
                            .then(createChildren);
                    })
                });
            };

            removeOldFiles()
                .then(createRootDir)
                .then(createDir)
                .then(createInitFile)
                .then(createChildren);

            res.json(res.resFormat);
        } else {
            res.resFormat.logicState = 1;
            res.resFormat.msg = "没有找到该节点";
            res.json(res.resFormat);
        }
    });
};

module.exports = actions;