define(['angular'], function (angular) {
    var myApp = angular.module('myApp', ['ui.router','ui.router.stateHelper', 'ui.bootstrap']);
    myApp.run(['$rootScope','$state','api','model', function ($rootScope,$state,api,model) {
        $rootScope.$state = $state;
        $rootScope.api = api;
        $rootScope.model = model;
    }]);
    return myApp;
});