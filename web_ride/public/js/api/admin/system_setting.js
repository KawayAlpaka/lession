define([], function () {

    var mHttp;
    var api = {};

    api.init = function (obj) {
        mHttp = obj;
        return api;
    };

    api.list = function () {
        return mHttp({
            url : '/api/system_settings',
            method:'GET',
            type : 'json'
        });
    };
    api.create = function (data) {
        return mHttp({
            url : '/api/system_settings'
            , method:'POST'
            , type : 'json'
            , data : data
        });
    };
    api.new = function () {
        return mHttp({
            url : '/api/system_settings/new',
            method:'GET',
            type : 'json'
        });
    };
    api.get = function (id) {
        return mHttp({
            url : '/api/system_settings/' + id,
            method:'GET',
            type : 'json'
        });
    };
    api.update = function (data) {
        return mHttp({
            url : '/api/system_settings',
            method:'PUT',
            type : 'json',
            data : data
        });
    };
    api.del = function (id) {
        return mHttp({
            url : '/api/system_settings/' + id,
            method:'DELETE',
            type : 'json'
        });
    };
    api.refresh = function () {
        return mHttp({
            url : '/api/system_settings/refresh',
            method:'GET',
            type : 'json'
        });
    };

    return api;
});