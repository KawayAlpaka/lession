define([], function () {

    var mHttp;
    var api = {};
    api.init = function (obj) {
        mHttp = obj;
        return api;
    };
    api.myProjects = function () {
        return mHttp({
            url : '/api/projects',
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
    api.getMembers = function (id) {
        return mHttp({
            url : '/api/projects/'+id+"/members",
            method:'GET',
            type : 'json'
        });
    };
    api.createMember = function (projectId,data) {
        return mHttp({
            url : '/api/projects/'+projectId+"/members",
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

    return api;
});