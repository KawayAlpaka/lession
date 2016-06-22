define(['angular'], function (angular) {
    var myApp = angular.module('myApp', ['ui.router', 'ui.bootstrap']);
    myApp.run(['$rootScope', function ($rootScope) {
    }]);
    return myApp;
});