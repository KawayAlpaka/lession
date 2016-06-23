define(['app'], function (myApp) {
    myApp.factory('myHttp', ['$q', '$http', function ($q, $http) {
        return function (request) {
            var promise;
            promise = $q(function (resolve, reject) {
                return $http(request)
                    .success(function (data, header, config, status) {
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