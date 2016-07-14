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

    return api;
});