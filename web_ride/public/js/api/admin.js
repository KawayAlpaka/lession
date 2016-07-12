define([], function () {
    var myHttp;
    var api = {};
    api.init = function (obj) {
        myHttp = obj;
        return api;
    };
    api.users = function () {
        return myHttp({
            url : '/api/admins/users',
            method:'GET',
            type : 'json'
        });
    };

    return api;
});