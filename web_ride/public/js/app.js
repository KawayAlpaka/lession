define(['angular'], function (angular) {
    var myApp = angular.module('myApp', ['ui.router','ui.router.stateHelper', 'ui.bootstrap','ngCookies']);
    myApp.run(['$rootScope','$state','api','model','mHelp', function ($rootScope,$state,api,model,mHelp) {
        $rootScope.$state = $state;
        $rootScope.api = api;
        $rootScope.model = model;
        $rootScope.mHelp = mHelp;
    }]);
    return myApp;
});