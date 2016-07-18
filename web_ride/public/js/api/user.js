define([], function () {

    var mHttp;
    var api = {};

    api.init = function (obj) {
        mHttp = obj;
        return api;
    };

    api.getCurrentUser = function () {
        return mHttp({
            url : '/api/users/currentUser',
            method:'GET',
            type : 'json'
        });
    };
    api.updateCurrentUser = function (data) {
        return mHttp({
            url : '/api/users/currentUser'
            , method:'PATCH'
            , type : 'json'
            , data : data
        });
    };


    api.login = function (data) {
        return mHttp({
            url : '/api/users/login',
            method:'POST',
            type : 'json',
            data : data
        });
    };
    api.logout = function () {
        return mHttp({
            url : '/api/users/logout',
            method:'GET',
            type : 'json'
        });
    };
    api.newUser = function () {
        return mHttp({
            url : '/api/users/new',
            method:'GET',
            type : 'json'
        });
    };
    
    return api;
});