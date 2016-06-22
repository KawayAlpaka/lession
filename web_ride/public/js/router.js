define(['app'], function (myApp) {
    myApp.config(['$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {
                $urlRouterProvider.otherwise("/index");
            }]
    );
});
