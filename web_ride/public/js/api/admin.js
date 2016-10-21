define(['./admin/system_setting'], function (system_setting) {
    var mHttp;
    var api = {};
    api.init = function (obj) {
        mHttp = obj;
        api.systemSetting = system_setting.init(mHttp);
        return api;
    };
    api.users = function () {
        return mHttp({
            url : '/api/admins/users',
            method:'GET',
            type : 'json'
        });
    };
    api.getUser = function (id) {
        return mHttp({
            url : '/api/admins/users/'+ id,
            method:'GET',
            type : 'json'
        });
    };
    api.createUser = function (data) {
        return mHttp({
            url : '/api/admins/users',
            method:'POST',
            type : 'json',
            data : data
        });
    };
    api.updateUser = function (id,data) {
        return mHttp({
            url : '/api/admins/users/'+ id,
            method:'PUT',
            type : 'json',
            data : data
        });
    };
    api.delUser = function (id) {
        return mHttp({
            url : '/api/admins/users/'+ id,
            method:'DELETE',
            type : 'json'
        });
    };

    return api;
});