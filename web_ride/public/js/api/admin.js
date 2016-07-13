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
    api.getUser = function (id) {
        return myHttp({
            url : '/api/admins/users/'+ id,
            method:'GET',
            type : 'json'
        });
    };
    api.createUser = function (data) {
        return myHttp({
            url : '/api/admins/users',
            method:'POST',
            type : 'json',
            data : data
        });
    };
    api.updateUser = function (id,data) {
        return myHttp({
            url : '/api/admins/users/'+ id,
            method:'PUT',
            type : 'json',
            data : data
        });
    };
    api.delUser = function (id) {
        return myHttp({
            url : '/api/admins/users/'+ id,
            method:'DELETE',
            type : 'json'
        });
    };

    return api;
});