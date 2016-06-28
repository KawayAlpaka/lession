define(['app','./api/robot_node','./api/action'], function (myApp,robot_node,action) {
    myApp.factory('api', ['myHttp', function (myHttp) {
        var api = {};

        api.robotNode = robot_node.init(myHttp);
        api.action = action.init(myHttp);

        return api;
    }]);
});