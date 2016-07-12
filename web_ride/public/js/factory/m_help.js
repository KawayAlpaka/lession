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

        return mHelp;
    }]);
});