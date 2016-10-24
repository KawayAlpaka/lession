var mongoose = require('mongoose');
var _ = require('underscore');
var mIo = require('../../socket/io');
var RobotNode = mongoose.model('RobotNode');
var extend = require('util')._extend;

var robotNodes = {};

robotNodes.list = function (req, res) {
    RobotNode.all(function (err, robotNodes) {
        res.resFormat.data = robotNodes;
        res.json(res.resFormat);
    });
};
robotNodes.create = function (req, res) {
    var robotNode = new RobotNode(req.body);
    console.log(robotNode);
    robotNode.save(function (err, robotNode) {
        if (err) {
            console.log(err)
        } else {
            res.resFormat.data = robotNode;
            res.json(res.resFormat);
        }
    });
};
robotNodes.find = function (req, res) {
    RobotNode.find(req.body, function (err, robotNodes) {
        if (err) {

        } else {
            res.resFormat.msg = "success";
            res.resFormat.data = robotNodes;
            res.json(res.resFormat);
        }
    });
};
robotNodes.findById = function (req, res) {
    var nodeId = req.params.id;
    RobotNode.find({_id: nodeId}, function (err, robotNodes) {
        if (robotNodes.length > 0) {
            res.resFormat.data = robotNodes[0];
            res.json(res.resFormat);
        } else {
            res.resFormat.logicState = 1;
            res.resFormat.msg = "没有找到该节点";
            res.json(res.resFormat);
        }
    });
};
robotNodes.findChildren = function (req, res) {
    var nodeId = req.params.id;
    RobotNode.find({parent: nodeId}, function (err, robotNodes) {
        res.resFormat.msg = "success";
        res.resFormat.data = robotNodes;
        res.json(res.resFormat);
    });
};

robotNodes.update = function (req, res) {
    var nodeId = req.params.id;
    RobotNode.find({_id: nodeId}, function (err, robotNodes) {
        if (robotNodes.length > 0) {
            var node = robotNodes[0];
            extend(node, req.body);
            node.save(function (err, node) {
                if (err) {
                    console.log(err)
                } else {
                    res.resFormat.data = node;
                    res.json(res.resFormat);
                    mIo.nodeUpdate(node);
                }
            });
        } else {
            res.resFormat.logicState = 1;
            res.resFormat.msg = "没有找到该节点";
            res.json(res.resFormat);
        }
    });
};

robotNodes.parentList = function (req, res) {
    var nodeId = req.params.id;
    RobotNode.find({_id: nodeId}, function (err, robotNodes) {
        if(err){
            return ;
        }
        if(robotNodes.length == 0){
            res.json(res.resFormat);
        }else{
            robotNodes[0].getParentList(function (nodes) {
                res.resFormat.data = nodes;
                res.json(res.resFormat);
            });
        }

    });
};
robotNodes.relativePath = function (req, res) {
    var sourceId = req.body.sourceId;
    var targetId = req.body.targetId;
    RobotNode.findOne({_id: targetId}, function (err, targetNode) {
        if(err){
            return ;
        }
        if(targetNode){
            var targetList;
            targetNode.getParentList(function (list) {
                targetList = list;
                RobotNode.findOne({_id: sourceId}, function (err, sourceNode){
                    if(err){
                        return ;
                    }
                    if(sourceNode){
                        var sourceList;
                        sourceNode.getParentList(function (list){
                            sourceList = list;
                            var rPath = "";
                            var index1 = -1;
                            var target1;
                            targetList.forEach(function (target) {
                                var index = _.findIndex(sourceList,function (source) {
                                    return target._id.toString() == source._id.toString();
                                });
                                if(index >=0){
                                    index1 = index;
                                    target1 = target;
                                    return;
                                }
                            });


                            //如果找到就继续，没找到，返回错误
                            if(target1){
                                for(var i = 0 ;i<index1;i++){
                                    rPath += "../";
                                }

                                var targetList2 = targetList.reverse();
                                var index2 = _.findIndex(targetList2,function (target) {
                                    return target._id.toString() == target1._id.toString();
                                });
                                console.log(index2);
                                for(var i = index2 + 1;i<targetList2.length;i++ ){
                                    rPath += targetList2[i].name + "/";
                                }
                                rPath += targetNode.name + "." + targetNode.fileFormat;

                                res.resFormat.data = rPath;
                                res.json(res.resFormat);
                            }else{
                                res.resFormat.data = "未找到路径";
                                res.json(res.resFormat);
                            }

                        });
                    }
                });
            });
        }
    });
};


module.exports = robotNodes;