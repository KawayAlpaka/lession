define(['app','./api/robot_node','./api/action','./api/user'], function (myApp,robot_node,action,user) {
    myApp.factory('api', ['myHttp', function (myHttp) {
        var api = {};

        api.robotNode = robot_node.init(myHttp);
        api.action = action.init(myHttp);
        api.user = user.init(myHttp);

        return api;
    }]);
});