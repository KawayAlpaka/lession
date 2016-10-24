var express = require('express');
var api = require('../controller/api');
var router = express.Router();

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

var crossDomain = function (req, res, next) {

    res.header('Access-Control-Allow-Origin', '*');
    // res.header('Access-Control-Allow-Origin', 'http://localhost:3030');
    // res.header('Access-Control-Allow-Credentials', 'true');
    // res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , Cookie, aaa');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With ,mSession, aaa');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS, PATCH, HEAD');
    if (req.method == 'OPTIONS') {
        res.sendStatus(200);//让options请求快速返回/
    } else {
        next();
    }
};

router.use(api.users.currentUser, defaultResFormatFn,crossDomain);

var usersRouter = express.Router();
usersRouter.get('/currentUser',api.users.requireLogin,api.users.getCurrentUser);
usersRouter.patch('/currentUser',api.users.requireLogin, api.users.updateCurrentUser);
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
router.get('/actions/downloadProjectFiles/:id', api.users.requireLogin, api.actions.downloadProjectFiles);
router.post('/actions/importProject/:id', api.users.requireLogin, api.actions.importProject);

router.get('/projects/my', api.users.requireLogin, api.projects.myProjects);
router.get('/projects/my/:relate', api.users.requireLogin, api.projects.myRelateProjects);
router.post('/projects', api.users.requireLogin, api.projects.create);
router.put('/projects', api.users.requireLogin, api.projects.update);
router.get('/projects/new', api.projects.new);
router.get('/projects/:id', api.projects.get);
router.get('/projects/:id/users/:relate', api.projects.getUsers);
router.post('/projects/:id/users/:relate', api.projects.createUser);
router.delete('/projects/:id', api.users.requireLogin, api.projects.del);

router.get('/debug_options', api.users.requireLogin, api.debugOptions.list);
router.post('/debug_options', api.users.requireLogin, api.debugOptions.create);
router.get('/debug_options/new', api.users.requireLogin, api.debugOptions.new);
router.get('/debug_options/:id', api.users.requireLogin, api.debugOptions.get);
router.put('/debug_options', api.users.requireLogin, api.debugOptions.update);
router.delete('/debug_options/:id', api.users.requireLogin, api.debugOptions.del);


router.get('/system_settings/refresh', api.users.requireLogin, api.systemSettings.refresh);
router.get('/system_settings', api.users.requireLogin, api.systemSettings.list);
router.post('/system_settings', api.users.requireLogin, api.systemSettings.create);
router.get('/system_settings/new', api.users.requireLogin, api.systemSettings.new);
router.get('/system_settings/:id', api.users.requireLogin, api.systemSettings.get);
router.put('/system_settings', api.users.requireLogin, api.systemSettings.update);
router.delete('/system_settings/:id', api.users.requireLogin, api.systemSettings.del);



router.get('/admins/users', api.admins.requireAdmin, api.admins.users.list);
router.post('/admins/users', api.admins.requireAdmin, api.admins.users.create);
router.put('/admins/users/:id', api.admins.requireAdmin, api.admins.users.update);
router.get('/admins/users/:id', api.admins.requireAdmin, api.admins.users.get);
router.delete('/admins/users/:id', api.admins.requireAdmin, api.admins.users.del);

router.get('/models/schema/:modelName', api.models.schema);

module.exports = router;