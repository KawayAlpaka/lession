define(['app','common','env'], function (myApp,common,env) {
    myApp.factory('mHelp', ['$cookieStore','$cookies','$rootScope','$location',function ($cookieStore,$cookies,$rootScope,$location) {
        var mHelp = {};
        mHelp.isLogin = function () {
            return common.strHelp.isNotEmptyStr($cookies.get("mSession"));
        };

        mHelp.getLocation = function () {
            return $location;
        };

        mHelp.go = function (link) {
            window.location.href = link;
        };
        mHelp.open = function (link) {
            window.open(link);
        };

        mHelp.pullCurrentUser = function (cb) {
            $rootScope.api.user.getCurrentUser()
                .success(function (data) {
                    mHelp.setCurrentUser(data.data);
                    if(cb){
                        cb();
                    }
                });
        };
        mHelp.setCurrentUser = function (user) {
            localStorage.setItem("currentUser", JSON.stringify(user));
        };
        mHelp.getCurrentUser = function () {
            return JSON.parse(localStorage.getItem("currentUser"));
        };
        mHelp.removeCurrentUser = function () {
            localStorage.removeItem("currentUser");
        };

        mHelp.clearLoginData = function () {
            $cookies.remove("mSession");
            mHelp.removeCurrentUser();
        };
        mHelp.setLoginData = function (sessionId,user) {
            var expires = new Date();
            expires.setDate(expires.getDate() + 30);
            $cookies.put('mSession', sessionId , {'expires': expires.toUTCString()});
            mHelp.setCurrentUser(user);
        };
        
        return mHelp;
    }]);
});