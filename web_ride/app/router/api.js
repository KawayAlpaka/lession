var express = require('express');
var routerUser = require('./api/user');
var routerRobotNode = require('./api/robot_node');
var router = express.Router();

// 该路由使用的中间件
router.use(function timeLog(req, res, next) {
    // console.log('Time: ', Date.now());
    next();
},function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

router.use('/users',routerUser);
router.use('/robot_nodes',routerRobotNode);

router.get('/', function(req, res) {
    console.log('hello api');
    res.send('hello api');
});

module.exports = router;