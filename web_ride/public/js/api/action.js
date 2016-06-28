define([], function () {

    var myHttp;
    var api = {};
    api.init = function (obj) {
        myHttp = obj;
        return api;
    };
    api.createProjectFiles = function (id) {
        return myHttp({
            url : '/api/actions/createProjectFiles/'+id,
            method:'GET',
            type : 'json'
        });
    };

    return api;
});