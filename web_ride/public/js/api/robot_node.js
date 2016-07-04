define([], function () {

    var myHttp;
    var api = {};
    api.init = function (obj) {
        myHttp = obj;
        return api;
    };
    api.findById = function (id) {
        return myHttp({
            url : '/api/robot_nodes/'+id,
            method:'GET',
            type : 'json'
        });
    };

    api.find = function (data) {
        return myHttp({
            url : '/api/robot_nodes/find',
            method:'POST',
            type : 'json',
            data : data
        });
    };

    api.findProjects = function () {
        var data = {
            type: "project"
        };
        return myHttp({
            url : '/api/robot_nodes/find',
            method:'POST',
            type : 'json',
            data : data
        });
    };
    api.create = function (data) {
        return myHttp({
            url : '/api/robot_nodes/',
            method:'POST',
            type : 'json',
            data : data
        });
    };
    api.update = function (id,data) {
        return myHttp({
            url : '/api/robot_nodes/'+id,
            method:'PATCH',
            type : 'json',
            data : data
        });
    };
    api.getChildren = function (id) {
        return myHttp({
            url : '/api/robot_nodes/'+id+"/children",
            method:'GET',
            type : 'json'
        });
    };

    return api;
});