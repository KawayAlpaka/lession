var express = require('express');
var mongoose = require('mongoose');
var RobotNode = mongoose.model('RobotNode');
var router = express.Router();

console.log("api RobotNode");

router.get('/', function(req, res) {
    res.send('hello api RobotNode');
});

router.get('/create', function(req, res) {
    var robotNode = new RobotNode({
        name: "节点名称",
        parent: null,
        type:"project",
        fileType:"dir",
        fileFormat:"robot"
    });
    robotNode.save(function(err, user) {
        console.log("robotNode创建");
        if (err) {
            console.log(err);
        }
        res.send('robotNode创建成功');
    });
});

module.exports = router;