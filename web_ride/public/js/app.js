define(['angular'], function (angular) {
    var myApp = angular.module('myApp', ['ui.router','ui.router.stateHelper', 'ui.bootstrap','ngCookies']);
    myApp.run(['$rootScope','$state','api','model','mHelp','mIo', function ($rootScope,$state,api,model,mHelp,mIo) {
        $rootScope.$state = $state;
        $rootScope.api = api;
        $rootScope.model = model;
        $rootScope.mHelp = mHelp;
        mIo.start();

        $rootScope.$on('$stateChangeSuccess', function(evt, toState, toParams, fromState, fromParams) {
            console.log('$stateChangeSuccess');
            console.log(arguments);
            if(fromState.name == "m1.workspace"){
                mIo.leaveWorkspace();
            }
        });

    }]);
    return myApp;
});