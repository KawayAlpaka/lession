// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

    .run(["$rootScope", "$ionicPlatform", function ($rootScope, $ionicPlatform) {
        console.log($ionicPlatform);
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)

            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
                console.log("cordova ready");
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    }])

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('m1', {
                url: '/m1',
                views: {
                    'index': {
                        templateUrl: 'templates/m1.html',
                        controller: 'M1Ctrl'
                    }
                }
            })
            .state('m1.tabs', {
                url: '/tabs',
                views: {
                    'm1': {
                        templateUrl: 'templates/m1/tabs.html',
                        controller: 'M1_TabsCtrl'
                    }
                }
            })
            .state('m1.tabs.content', {
                url: '/content',
                views: {
                    'tabs': {
                        templateUrl: 'templates/m1/tabs/content.html',
                        controller: 'M1_Tabs_ContentCtrl'
                    }
                }
            })
            .state('m1.tabs.2level', {
                url: '/2level',
                views: {
                    'tabs': {
                        templateUrl: 'templates/m1/tabs/2level.html',
                        controller: 'M1_Tabs_2levelCtrl'
                    }
                }
            })
            .state('m1.tabs.2level.1', {
                url: '/1',
                views: {
                    '2level': {
                        templateUrl: 'templates/m1/tabs/2level/1.html',
                        controller: 'M1_Tabs_2level_1Ctrl'
                    }
                }
            })
            .state('m1.tabs.2level.2', {
                url: '/2',
                views: {
                    '2level': {
                        templateUrl: 'templates/m1/tabs/2level/2.html',
                        controller: 'M1_Tabs_2level_2Ctrl'
                    }
                }
            });

        $urlRouterProvider.otherwise('/m1');

    });
