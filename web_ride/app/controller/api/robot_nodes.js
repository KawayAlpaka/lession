var mongoose = require('mongoose');
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
    console.log(req.params.id);
    RobotNode.find({_id: req.params.id}, function (err, robotNodes) {
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
    console.log(req.params.id);
    RobotNode.find({parent: req.params.id}, function (err, robotNodes) {
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
            // node.form = req.body;
            extend(node, req.body);
            node.save(function (err, node) {
                if (err) {
                    console.log(err)
                } else {
                    res.resFormat.data = node;
                    res.json(res.resFormat);
                }
            });
        } else {
            res.resFormat.logicState = 1;
            res.resFormat.msg = "没有找到该节点";
            res.json(res.resFormat);
        }
    });
};

module.exports = robotNodes;