define(['app','./api/robot_node','./api/action','./api/user','./api/admin'], function (myApp,robot_node,action,user,admin) {
    myApp.factory('api', ['myHttp', function (myHttp) {
        var api = {};

        api.robotNode = robot_node.init(myHttp);
        api.action = action.init(myHttp);
        api.user = user.init(myHttp);
        api.admin = admin.init(myHttp);

        return api;
    }]);
});