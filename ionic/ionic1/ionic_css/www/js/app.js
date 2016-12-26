define(['ionic.bundle'], function (angular) {
    var starter = angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','ngCookies'])

        .run(["$rootScope", "$ionicPlatform","$http", function ($rootScope, $ionicPlatform,$http) {
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

            //启动微信js接口
            $http({
                url: '/api/weixin/config' ,
                method: 'GET'
            }).success(function (res) {
                console.log(res);
                wx.config(res.data);
                wx.ready(function(){
                    console.log(arguments);
                });
                wx.error(function(res){
                    console.log(arguments);
                });
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
                .state('m1.tabs.js', {
                    url: '/js',
                    views: {
                        'tabs': {
                            templateUrl: 'templates/m1/tabs/js.html',
                            controller: 'M1_Tabs_JsCtrl'
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
                })
                .state('m1.tabs.settings', {
                    url: '/settings',
                    views: {
                        'tabs': {
                            templateUrl: 'templates/m1/tabs/settings.html',
                            controller: 'M1_Tabs_SettingsCtrl'
                        }
                    }
                });

            $urlRouterProvider.otherwise('/m1/tabs');

        });
    return starter;
});
