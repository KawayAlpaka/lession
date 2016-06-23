define(['angular'], function (angular) {
    var myApp = angular.module('myApp', ['ui.router','ui.router.stateHelper', 'ui.bootstrap']);
    myApp.run(['$rootScope','$state', function ($rootScope,$state) {
        $rootScope.$state = $state;
    }]);
    return myApp;
});