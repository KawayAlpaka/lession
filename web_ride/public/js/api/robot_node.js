define([], function () {

    var mHttp;
    var api = {};
    api.init = function (obj) {
        mHttp = obj;
        return api;
    };
    api.findById = function (id) {
        return mHttp({
            url : '/api/robot_nodes/'+id,
            method:'GET',
            type : 'json'
        });
    };

    api.find = function (data) {
        return mHttp({
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
        return mHttp({
            url : '/api/robot_nodes/find',
            method:'POST',
            type : 'json',
            data : data
        });
    };
    api.create = function (data) {
        return mHttp({
            url : '/api/robot_nodes/',
            method:'POST',
            type : 'json',
            data : data
        });
    };
    api.update = function (id,data) {
        return mHttp({
            url : '/api/robot_nodes/'+id,
            method:'PATCH',
            type : 'json',
            data : data
        });
    };
    api.getChildren = function (id) {
        return mHttp({
            url : '/api/robot_nodes/'+id+"/children",
            method:'GET',
            type : 'json'
        });
    };
    api.getParentList = function (id) {
        return mHttp({
            url : '/api/robot_nodes/'+id+"/parent_list",
            method:'GET',
            type : 'json'
        });
    };
    api.getRelativePath = function (data) {
        return mHttp({
            url : "/api/robot_nodes/relative_path",
            method:'POST',
            type : 'json',
            data:data
        });
    };

    return api;
});