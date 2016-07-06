define(['app'], function (myApp) {
    myApp.factory('cookieHelp', ['$cookieStore','$cookies',function ($cookieStore,$cookies) {
        var cookieHelp = {};
        
        return cookieHelp;
    }]);
});