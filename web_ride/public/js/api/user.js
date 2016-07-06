define([], function () {

    var myHttp;
    var api = {};

    api.init = function (obj) {
        myHttp = obj;
        return api;
    };
    api.login = function (data) {
        return myHttp({
            url : '/api/users/login',
            method:'POST',
            type : 'json',
            data : data
        });
    };
    api.logout = function () {
        return myHttp({
            url : '/api/users/logout',
            method:'GET',
            type : 'json'
        });
    };
    
    return api;
});