define(['app','./api/robot_node','./api/action','./api/user','./api/admin'], function (myApp,robot_node,action,user,admin) {
    myApp.factory('api', ['mHttp', function (mHttp) {
        var api = {};

        api.robotNode = robot_node.init(mHttp);
        api.action = action.init(mHttp);
        api.user = user.init(mHttp);
        api.admin = admin.init(mHttp);

        return api;
    }]);
});