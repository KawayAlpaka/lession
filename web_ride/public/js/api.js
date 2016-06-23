define(['app'], function (myApp) {
    myApp.factory('api', ['myHttp', function (myHttp) {
        var api = {};
        // console.log(myHttp);
        api.robotNode = {};
        api.robotNode.findById = function (id) {
            return myHttp({
                url : '/api/robot_nodes/'+id,
                method:'GET',
                type : 'json'
            });
        };
        api.robotNode.create = function (data) {
            return myHttp({
                url : '/api/robot_nodes/',
                method:'POST',
                type : 'json',
                data : data
            });
        };
        api.robotNode.getChildren = function (id) {
            return myHttp({
                url : '/api/robot_nodes/'+id+"/children",
                method:'GET',
                type : 'json'
            });
        };

        return api;
    }]);
});