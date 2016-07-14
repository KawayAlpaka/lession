define([], function () {

    var mHttp;
    var api = {};
    api.init = function (obj) {
        mHttp = obj;
        return api;
    };
    api.createProjectFiles = function (id) {
        return mHttp({
            url : '/api/actions/createProjectFiles/'+id,
            method:'GET',
            type : 'json'
        });
    };
    api.runProject = function (id) {
        return mHttp({
            url : '/api/actions/runProject/'+id,
            method:'GET',
            type : 'json'
        });
    };

    return api;
});