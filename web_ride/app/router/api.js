var express = require('express');
var api = require('../controller/api');
// var routerUser = require('./api/user');
// var routerRobotNode = require('./api/robot_node');
var router = express.Router();


router.use(function (req, res, next) {
    res.resFormat = {
        data:null,
        logicState:0,
        msg:"success",
        state:0
    };
    next();
},function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

router.get('/', function(req, res) {
    console.log('hello api');
    res.send('hello api');
});

// router.use('/users',routerUser);
// router.use('/robot_nodes', routerRobotNode);

router.post('/users', api.users.create );

router.get('/robot_nodes',api.robotNodes.list);
router.post('/robot_nodes', api.robotNodes.create );
router.post('/robot_nodes/find', api.robotNodes.find);
router.get('/robot_nodes/:id', api.robotNodes.findById);
router.get('/robot_nodes/:id/children', api.robotNodes.findChildren);
router.patch('/robot_nodes/:id', api.robotNodes.update);

router.get('action/createProjectFiles/:id',function (req, res) {

});

module.exports = router;