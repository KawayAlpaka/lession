define([], function () {

    var mHttp;
    var api = {};

    api.init = function (obj) {
        mHttp = obj;
        return api;
    };

    api.list = function () {
        return mHttp({
            url : '/api/debug_options',
            method:'GET',
            type : 'json'
        });
    };
    api.create = function (data) {
        return mHttp({
            url : '/api/debug_options'
            , method:'POST'
            , type : 'json'
            , data : data
        });
    };
    api.new = function () {
        return mHttp({
            url : '/api/debug_options/new',
            method:'GET',
            type : 'json'
        });
    };
    api.get = function (id) {
        return mHttp({
            url : '/api/debug_options/' + id,
            method:'GET',
            type : 'json'
        });
    };
    api.update = function (data) {
        return mHttp({
            url : '/api/debug_options',
            method:'PUT',
            type : 'json',
            data : data
        });
    };
    api.del = function (id) {
        return mHttp({
            url : '/api/debug_options/' + id,
            method:'DELETE',
            type : 'json'
        });
    };

    return api;
});