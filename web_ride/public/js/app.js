define(['angular','socket'], function (angular,io) {
    var myApp = angular.module('myApp', ['ui.router','ui.router.stateHelper', 'ui.bootstrap','ngCookies']);
    myApp.run(['$rootScope','$state','api','model','mHelp', function ($rootScope,$state,api,model,mHelp) {
        $rootScope.$state = $state;
        $rootScope.api = api;
        $rootScope.model = model;
        $rootScope.mHelp = mHelp;

        //socket.io
        var socket = io.connect();
        $rootScope.socket = socket;
        $rootScope.count = {};
        socket.on('workingOnProjectCount', function (data) {
            console.log(data);
            $rootScope.count.workingOnProjectCount = data.count;
            $rootScope.$apply();
        });
        socket.on('workingOnNodeCount', function (data) {
            console.log(data);
            $rootScope.count.workingOnNodeCount = data.count;
            $rootScope.$apply();
        });
    }]);
    return myApp;
});