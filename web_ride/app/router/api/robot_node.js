var express = require('express');
var mongoose = require('mongoose');
var RobotNode = mongoose.model('RobotNode');
var router = express.Router();

console.log("api RobotNode");

router.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

router.get('/', function(req, res) {
    RobotNode.all(function (err, robotNodes) {
        res.resFormat.data = robotNodes;
        res.json(res.resFormat);
    });
});

router.post('/', function(req, res) {
    console.log(req.body);
    var robotNode = new RobotNode(req.body);
    robotNode.save(function (err, robotNode) {
        if(err){

        }else{
            res.resFormat.msg = "post robot node";
            res.resFormat.data = robotNode;
            res.json(res.resFormat);
        }
    });

});

router.get('/:id', function(req, res) {
    console.log(req.params.id);
    RobotNode.find({_id:req.params.id},function (err, robotNodes) {
        if(robotNodes.length > 0) {
            res.resFormat.data = robotNodes[0];
            res.json(res.resFormat);
        }else{
            res.resFormat.logicState = 1;
            res.resFormat.msg = "没有找到该节点";
            res.json(res.resFormat);
        }
    });
});

router.get('/:id/children', function(req, res) {
    console.log(req.params.id);
    RobotNode.find({parent:req.params.id},function (err, robotNodes) {

        res.resFormat.msg = "success";
        res.resFormat.data = robotNodes;
        res.json(res.resFormat);

    });
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