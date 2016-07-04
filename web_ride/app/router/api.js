var express = require('express');
var api = require('../controller/api');
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

router.post('/users', api.users.create );

router.get('/robot_nodes',api.robotNodes.list);
router.post('/robot_nodes', api.robotNodes.create );
router.post('/robot_nodes/find', api.robotNodes.find);
router.get('/robot_nodes/:id', api.robotNodes.findById);
router.get('/robot_nodes/:id/children', api.robotNodes.findChildren);
router.patch('/robot_nodes/:id', api.robotNodes.update);
router.get('/robot_nodes/:id/parent_list', api.robotNodes.parentList );

router.get('/actions/createProjectFiles/:id',api.actions.createProjectFiles);

module.exports = router;