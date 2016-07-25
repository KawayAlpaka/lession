define(['app', './api/robot_node', './api/action', './api/user', './api/admin', './api/project', './api/debug_option', './api/model'],
    function (myApp, robot_node, action, user, admin, project,debug_option,model) {
        myApp.factory('api', ['mHttp', function (mHttp) {
            var api = {};

            api.robotNode = robot_node.init(mHttp);
            api.action = action.init(mHttp);
            api.user = user.init(mHttp);
            api.admin = admin.init(mHttp);
            api.project = project.init(mHttp);
            api.debugOption = debug_option.init(mHttp);
            api.model = model.init(mHttp);

            return api;
        }]);
    });