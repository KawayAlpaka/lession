var express = require('express');
var api = require('../controller/api');
var router = express.Router();


router.use(api.users.currentUser,function (req, res, next) {
    res.resFormat = {
        data:{},
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

// router.post('/users', api.users.create );
router.get('/users/new', api.users.new );
router.post('/users/login', api.users.login );
router.get('/users/logout', api.users.logout );

router.get('/robot_nodes',api.robotNodes.list);
router.post('/robot_nodes', api.robotNodes.create );
router.post('/robot_nodes/find', api.robotNodes.find);
router.get('/robot_nodes/:id', api.robotNodes.findById);
router.get('/robot_nodes/:id/children', api.robotNodes.findChildren);
router.patch('/robot_nodes/:id', api.robotNodes.update);
router.get('/robot_nodes/:id/parent_list', api.robotNodes.parentList );
router.post('/robot_nodes/relative_path', api.robotNodes.relativePath );

router.get('/actions/createProjectFiles/:id',api.actions.createProjectFiles);
router.get('/actions/runProject/:id',api.actions.runProject );

router.get('/admins/users',api.admins.requireAdmin,api.admins.users.list );
router.post('/admins/users',api.admins.requireAdmin, api.admins.users.create );
router.put('/admins/users/:id',api.admins.requireAdmin, api.admins.users.update );
router.get('/admins/users/:id',api.admins.requireAdmin, api.admins.users.get );
router.delete('/admins/users/:id',api.admins.requireAdmin, api.admins.users.del );

module.exports = router;