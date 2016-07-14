define(['app','common'], function (myApp,common) {
    myApp.factory('mHelp', ['$cookieStore','$cookies',function ($cookieStore,$cookies) {
        var mHelp = {};
        mHelp.isLogin = function () {
            return common.strHelp.isNotEmptyStr($cookies.get("mSession"));
        };

        mHelp.go = function (link) {
            window.location.href = link;
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
            $cookies.put('mSession', user , {'expires': expires.toUTCString()});
            mHelp.setCurrentUser(user);
        };


        return mHelp;
    }]);
});