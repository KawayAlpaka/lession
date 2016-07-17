var express = require('express');
var api = require('../controller/api');
var router = express.Router();

var errFn = function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
};
var defaultResFormatFn = function (req, res, next) {
    res.resFormat = {
        data: {},
        logicState: 0,
        msg: "success",
        // state 0:正常,600:未登录,601:缺少管理员权限
        state: 0
    };
    next();
};

router.use(api.users.currentUser, defaultResFormatFn, errFn);

// router.get('/', function(req, res) {
//     console.log('hello api');
//     res.send('hello api');
// });



// // router.post('/users', api.users.create );
// router.get('/users/new', api.users.new);
// router.post('/users/login', api.users.login);
// router.get('/users/logout', api.users.logout);

var usersRouter = express.Router();
usersRouter.get('/new', api.users.new);
usersRouter.post('/login', api.users.login);
usersRouter.get('/logout', api.users.logout);
router.use('/users', usersRouter);

// router.get('/robot_nodes', api.robotNodes.list);
// router.post('/robot_nodes', api.robotNodes.create);
// router.post('/robot_nodes/find', api.robotNodes.find);
// router.get('/robot_nodes/:id', api.robotNodes.findById);
// router.get('/robot_nodes/:id/children', api.robotNodes.findChildren);
// router.patch('/robot_nodes/:id', api.robotNodes.update);
// router.get('/robot_nodes/:id/parent_list', api.robotNodes.parentList);
// router.post('/robot_nodes/relative_path', api.robotNodes.relativePath);

var robotNodesRouter = express.Router();
robotNodesRouter.get('', api.robotNodes.list);
robotNodesRouter.post('', api.robotNodes.create);
robotNodesRouter.post('/find', api.robotNodes.find);
robotNodesRouter.get('/:id', api.robotNodes.findById);
robotNodesRouter.get('/:id/children', api.robotNodes.findChildren);
robotNodesRouter.patch('/:id', api.robotNodes.update);
robotNodesRouter.get('/:id/parent_list', api.robotNodes.parentList);
robotNodesRouter.post('/relative_path', api.robotNodes.relativePath);
router.use('/robot_nodes', api.users.requireLogin ,robotNodesRouter);

router.get('/actions/createProjectFiles/:id', api.users.requireLogin, api.actions.createProjectFiles);
router.get('/actions/runProject/:id', api.users.requireLogin, api.actions.runProject);

router.get('/projects/my', api.users.requireLogin, api.projects.myProjects);
router.get('/projects/my/:relate', api.users.requireLogin, api.projects.myRelateProjects);
router.post('/projects', api.users.requireLogin, api.projects.create);
router.put('/projects', api.users.requireLogin, api.projects.update);
router.get('/projects/new', api.projects.new);
router.get('/projects/:id', api.projects.get);
router.get('/projects/:id/users/:relate', api.projects.getUsers);
router.post('/projects/:id/users/:relate', api.projects.createUser);
router.delete('/projects/:id', api.users.requireLogin, api.projects.del);

router.get('/admins/users', api.admins.requireAdmin, api.admins.users.list);
router.post('/admins/users', api.admins.requireAdmin, api.admins.users.create);
router.put('/admins/users/:id', api.admins.requireAdmin, api.admins.users.update);
router.get('/admins/users/:id', api.admins.requireAdmin, api.admins.users.get);
router.delete('/admins/users/:id', api.admins.requireAdmin, api.admins.users.del);

module.exports = router;