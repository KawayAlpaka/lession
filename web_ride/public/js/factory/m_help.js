define(['app','common'], function (myApp,common) {
    myApp.factory('mHelp', ['$cookieStore','$cookies',function ($cookieStore,$cookies) {
        var mHelp = {};
        mHelp.isLogin = function () {
            return common.strHelp.isNotEmptyStr($cookies.get("mSession"));
        };

        mHelp.go = function (link) {
            window.location.href = link;
        };
        return mHelp;
    }]);
});