define(['angular'], function (angular) {
    var myApp = angular.module('myApp', ['ui.router','ui.router.stateHelper', 'ui.bootstrap','ngCookies', 'ngAnimate']);
    myApp.run(['$rootScope','$state','api','model','mHelp','mIo', function ($rootScope,$state,api,model,mHelp,mIo) {
        $rootScope.$state = $state;
        $rootScope.api = api;
        $rootScope.model = model;
        $rootScope.mHelp = mHelp;
        mIo.start();

        $rootScope.$on('$stateChangeSuccess', function(evt, toState, toParams, fromState, fromParams) {
            if(fromState.name == "m1.workspace"){
                mIo.leaveWorkspace();
            }
        });
    }]);
    myApp.config(['$httpProvider', function($httpProvider) {
        // console.log("myApp.config");
        // $httpProvider.defaults.withCredentials = true;
    }]);
    return myApp;
});