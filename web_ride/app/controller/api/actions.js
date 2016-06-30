var fs = require('fs-extra');
var Q = require("q");
var mongoose = require('mongoose');
var common = require('../../../public/js/common');
var RobotNode = mongoose.model('RobotNode');
var strHelp = common.strHelp;

var getFileContent = function (node,cb) {
    if (node.fileType == "dir") {

    } else if (node.fileType == "file") {
        var content = "*** Test Cases ***\r\n";
        node.children(function (err,children) {
            if(err){
                console.log(err);
                return;
            }
            
            var insertValueCommont = function (title,value,commont) {
                if(strHelp.isNotEmptyStr(value) || strHelp.isNotEmptyStr(commont) ){
                    content += "    [" + title + "]";
                    if(strHelp.isNotEmptyStr(value)){
                        content += "    " + value;
                    }
                    if(strHelp.isNotEmptyStr(commont)){
                        content += "    " + "# " + commont;
                    }
                    content += "\r\n";
                }
            };
            
            children.forEach(function (child) {
                if(child.type == "case"){
                    content += child.name + "\r\n";
                    if(strHelp.isNotEmptyStr(child.documentation)){
                        content += "    [Documentation]    " + child.documentation + "\r\n";
                    }
                    // 占位 tags

                    insertValueCommont("Setup",child.setup.value,child.setup.comment);
                    insertValueCommont("Template",child.template.value,child.template.comment);
                    insertValueCommont("Timeout",child.timeout.value,child.timeout.comment);

                    if(child.form){
                        child.form.rows.forEach(function (row) {
                            row.cells.forEach(function (cell) {
                                content += "    " + cell.text;
                            });
                            content +="\r\n";
                        });
                    }
                    insertValueCommont("Teardown",child.teardown.value,child.teardown.comment);
                    content += "\r\n";
                }
            });
            cb(content);
        });
    }
};

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
                    fs.writeFile(initFileFullName, "", {flag: 'w'}, function (err) {
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

            var dealDir = function (data,child,cb) {
                //创建目录
                var path = data.path + "/" + child.name;
                fs.mkdir(path, 0666, function (err) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    //创建__init__文件
                    var initFileFullName = path + '/__init__.txt';
                    fs.writeFile(initFileFullName, "", {flag: 'w'}, function (err) {
                        if(err) {
                            console.error(err);
                        } else {
                            //获取子元素
                            child.children(function (err,children) {
                                var nData = {
                                    path: path,
                                    nodes:children
                                };
                                walk(nData)
                                    .then(cb);
                            });
                        }
                    });
                });
            };

            var walk = function (data) {
                console.log("walk");
                var deferred = Q.defer();
                var len = data.nodes.length;
                if(len == 0){
                    deferred.resolve();
                }
                data.nodes.forEach(function (child) {
                    if(child.fileType == "dir"){
                        dealDir(data,child,function () {
                            len --;
                            if(len == 0){
                                deferred.resolve();
                            }
                        });
                    }else if(child.fileType == "file"){
                        var fileFullName = data.path + '/' + child.name + '.txt';
                        getFileContent(child,function (content) {
                            fs.writeFile(fileFullName, content , {flag: 'w'}, function (err) {
                                if (err) {
                                    console.error(err);
                                } else {
                                    len --;
                                    if(len == 0){
                                        deferred.resolve();
                                    }
                                }
                            });
                        });
                    }else{
                        len --;
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
                    res.json(res.resFormat);
                });

        } else {
            res.resFormat.logicState = 1;
            res.resFormat.msg = "没有找到该节点";
            res.json(res.resFormat);
        }
    });
};

module.exports = actions;