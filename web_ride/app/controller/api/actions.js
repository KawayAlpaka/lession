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
            
            var createFiles = function (data) {
                // console.log("createFiles");
                var deferred = Q.defer();
                if( data.node.fileType == "dir" ) {
                    data.length.length --;
                    console.log(data.length.length);
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
                        console.log(dir);
                        var initFileFullName = nData.path + '/__init__.txt';
                        fs.writeFile(initFileFullName, "__init__", {flag: 'w'}, function (err) {
                            if(err) {
                                console.error(err);
                            } else {
                                console.log(initFileFullName);
                                deferred.resolve(nData);
                            }
                        });
                    });
                } else if (data.node.fileType == "file") {
                    data.length.length --;
                    console.log(data.length.length);
                    var fileFullName = data.path + '/' + data.node.name + '.txt';
                    fs.writeFile(fileFullName, "file", {flag: 'w'}, function (err) {
                        if (err) {
                            console.error(err);
                        } else {
                            console.log(fileFullName);
                        }
                    });
                }
                return deferred.promise;
            };

            var createChildren = function (data) {
                var deferred = Q.defer();
                data.node.children(function (err,children) {
                    var length = {};
                    length.length = children.length;
                    children.forEach(function (child) {
                        var nData = {
                            path: data.path,
                            node:child,
                            length:length
                        };
                        createFiles(nData)
                            .then(createChildren);
                    })
                });
                return deferred.promise;
            };

            var createProject = function (data) {
                var deferred = Q.defer();
                var path = data.path + "/" +  data.node.name;
                fs.mkdir(path, 0666, function (err) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log(path);
                    var initFileFullName = path + '/__init__.txt';
                    fs.writeFile(initFileFullName, "__init__", {flag: 'w'}, function (err) {
                        if(err) {
                            console.error(err);
                        } else {
                            console.log(initFileFullName);
                        }
                        data.node.children(function (err,children) {
                            var nData = {
                                path: path,
                                nodes:children
                            };
                            deferred.resolve(nData);
                        });
                    });
                });
                return deferred.promise;
            };
            var lev = 0;
            var walk = function (data) {
                console.log("walk");
                var deferred = Q.defer();
                var len = data.nodes.length;
                console.log(lev + ":"+ len);
                lev ++;
                if(len == 0){
                    deferred.resolve();
                }

                data.nodes.forEach(function (child) {
                    if(child.fileType == "dir"){
                        //创建目录
                        var path = data.path + "/" + child.name;
                        fs.mkdir(path, 0666, function (err) {
                            if (err) {
                                console.log(err);
                                return;
                            }
                            console.log(path);
                            //创建__init__文件
                            var initFileFullName = path + '/__init__.txt';
                            fs.writeFile(initFileFullName, "__init__", {flag: 'w'}, function (err) {
                                if(err) {
                                    console.error(err);
                                } else {
                                    console.log(initFileFullName);
                                    //获取子元素
                                    child.children(function (err,children) {
                                        var nData = {
                                            path: path,
                                            nodes:children
                                        };
                                        walk(nData)
                                            .then(function () {
                                                len --;
                                                console.log(len);
                                                if(len == 0){
                                                    deferred.resolve();
                                                }
                                            });
                                    });
                                }
                            });
                        });
                    }else if(child.fileType == "file"){
                        len --;
                        console.log(len);
                        if(len == 0){
                            deferred.resolve();
                        }
                    }else{
                        len --;
                        console.log(len);
                        if(len == 0){
                            deferred.resolve();
                        }
                    }
                });
                return deferred.promise;
            };

            removeOldFiles()
                .then(createRootDir)
                .then(createProject)
                .then(walk)
                .then(function () {
                    console.log("finish");
                });

            // removeOldFiles()
            //     .then(createRootDir)
            //     .then(createFiles)
            //     .then(createChildren)
            //     .then(function (data) {
            //         console.log("finish")
            //     });

            res.json(res.resFormat);
        } else {
            res.resFormat.logicState = 1;
            res.resFormat.msg = "没有找到该节点";
            res.json(res.resFormat);
        }
    });
};

module.exports = actions;