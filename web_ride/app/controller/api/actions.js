var fs = require('fs-extra');
var mongoose = require('mongoose');
var exec = require('child_process').exec;
var common = require('../../../public/js/common');
var fileHelper = require('../../helper/file_helper');
var RobotNode = mongoose.model('RobotNode');

var archiver = require('archiver');

var basePath = 'D:/test/';


var actions = {};
actions.createProjectFiles = function (req, res) {
    var nodeId = req.params.id;
    RobotNode.findOne({_id: nodeId}, function (err, robotNode) {
        if (robotNode) {
            var pNode = robotNode;
            var projectPath = basePath + pNode._id;
            fileHelper.createProjectFiles(pNode, projectPath,null, function () {
                res.json(res.resFormat);
            });
        } else {
            res.resFormat.logicState = 1;
            res.resFormat.msg = "没有找到该节点";
            res.json(res.resFormat);
        }
    });
};

actions.downloadProjectFiles = function (req, res) {


    // res.download('config.rb');

    var nodeId = req.params.id;
    RobotNode.findOne({_id: nodeId}, function (err, robotNode) {
        if (robotNode) {
            var pNode = robotNode;
            var projectPath = basePath + pNode._id;
            fileHelper.createProjectFiles(pNode, projectPath,null, function () {
                console.log("finish");
                var path = projectPath+"/"+pNode.name;
                var output = fs.createWriteStream(path+".zip");
                var archive = archiver('zip');

                archive.on('error', function(err){
                    throw err;
                });
                console.log(path);
                archive.pipe(output);
                archive.bulk([
                    {
                        src: ['**'],
                        // dest: mainItem.path + '/',
                        cwd: path,
                        expand: true
                    }
                ]);
                archive.finalize();
                output.on('close', function () {
                    console.log("close");
                    res.download(path+".zip");
                    // return cb(null, `Success`);
                });
                console.log("11");
            });
        } else {
            res.resFormat.logicState = 1;
            res.resFormat.msg = "没有找到该节点";
            res.json(res.resFormat);
        }
    });
};

actions.runProject = function (req, res) {
    var nodeId = req.params.id;
    RobotNode.findOne({_id: nodeId}, function (err, robotNode) {
        if (robotNode) {
            var pNode = robotNode;
            var projectPath = basePath + pNode._id;
            fileHelper.createProjectFiles(pNode, projectPath,null, function () {
                console.log("文件生成完成");
                exec('pybot --outputdir '+projectPath+" "+projectPath + "/" + pNode.name,function(error,stdout,stderr){
                    console.log("执行完成");
                    // if(stdout.length >1){
                    //     console.log('you offer args:',stdout);
                    // } else {
                    //     console.log('you don\'t offer args');
                    // }
                    if(error) {
                        console.info('stderr : '+stderr);
                    }
                });
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