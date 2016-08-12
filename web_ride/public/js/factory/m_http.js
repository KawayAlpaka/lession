define(['app','env'], function (myApp,env) {
    myApp.factory('mHttp', ['$q', '$http','mHelp','$cookies', function ($q, $http,mHelp,$cookies) {
        return function (request) {
            var promise;
            promise = $q(function (resolve, reject) {
                if(env.server){
                    request.url = env.server + request.url;
                }

                var random = parseInt(Math.random() * 10000);
                if (request.url.indexOf('?') !== -1) {
                    request.url = request.url + "&random=" + random;
                } else {
                    request.url = request.url + "?random=" + random;
                }

                request.headers = {'aaa' : 123};
                request.headers = {'mSession' : $cookies.get("mSession")};

                return $http(request)
                    .success(function (data, header, config, status) {
                        if(data.state == 600){
                            // 清除登录数据，跳转到登录页面
                            mHelp.clearLoginData();
                            mHelp.go("#/m1/user/login");
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