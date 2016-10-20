define([], function () {

    var mHttp;
    var api = {};
    api.init = function (obj) {
        mHttp = obj;
        return api;
    };
    api.myProjects = function () {
        return mHttp({
            url : '/api/projects/my',
            method:'GET',
            type : 'json'
        });
    };
    api.myRelateProjects = function (relate) {
        return mHttp({
            url : '/api/projects/my/' + relate,
            method:'GET',
            type : 'json'
        });
    };
    api.new = function () {
        return mHttp({
            url : '/api/projects/new',
            method:'GET',
            type : 'json'
        });
    };
    api.create = function (data) {
        return mHttp({
            url : '/api/projects',
            method:'POST',
            type : 'json',
            data : data
        });
    };
    api.get = function (id) {
        return mHttp({
            url : '/api/projects/'+id,
            method:'GET',
            type : 'json'
        });
    };
    api.getUsers = function (id,relate) {
        return mHttp({
            url : '/api/projects/'+id+"/users/" + relate,
            method:'GET',
            type : 'json'
        });
    };
    api.createUser = function (projectId,relate,data) {
        return mHttp({
            url : '/api/projects/'+projectId+"/users/"+relate,
            method:'POST',
            type : 'json',
            data : data
        });
    };
    api.update = function (data) {
        return mHttp({
            url : '/api/projects/',
            method:'PUT',
            type : 'json',
            data : data
        });
    };
    api.del = function (id) {
        return mHttp({
            url : '/api/projects/' + id,
            method:'DELETE',
            type : 'json'
        });
    };

    return api;
});