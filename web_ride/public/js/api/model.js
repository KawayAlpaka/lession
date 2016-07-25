define([], function () {
    var mHttp;
    var api = {};
    api.init = function (obj) {
        mHttp = obj;
        return api;
    };
    api.schema = function (modelName) {
        return mHttp({
            url : '/api/models/schema/' + modelName,
            method:'GET',
            type : 'json'
        });
    };

    return api;
});