define(['angular'], function (angular) {
    var myApp = angular.module('myApp', ['ui.router','ui.router.stateHelper', 'ui.bootstrap']);
    myApp.run(['$rootScope','$state','api', function ($rootScope,$state,api) {
        $rootScope.$state = $state;
        $rootScope.api = api;
    }]);
    return myApp;
});