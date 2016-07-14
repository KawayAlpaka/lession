define(['app'], function (myApp) {
    myApp.factory('mHttp', ['$q', '$http','mHelp', function ($q, $http,mHelp) {
        return function (request) {
            var promise;
            promise = $q(function (resolve, reject) {
                return $http(request)
                    .success(function (data, header, config, status) {
                        if(data.state == 600){
                            // 清除登录数据，跳转到登录页面
                            mHelp.clearLoginData();
                        }
                        resolve(data, header, config, status);
                    })
                    .error(function (data, header, config, status) {
                        reject(data, header, config, status);
                    });
            });
            promise.success = function (fn) {
                promise.then(fn);
                return promise;
            };
            promise.error = function (fn2) {
                return promise["catch"](fn2);
            };
            return promise;
        };
    }]);
});