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

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })

      // Each tab has its own nav history stack:
      .state('tab.test-weixin', {
        url: '/test-weixin',
        views: {
          'tab-test-weixin': {
            templateUrl: 'templates/tab-test-weixin.html',
            controller: 'TestWeixinCtrl'
          }
        }
      })
      .state('tab.test-weixin.OAuth', {
        url: '/OAuth',
        views: {
          'test-weixin': {
            templateUrl: 'templates/test_weixin/OAuth.html',
            controller: 'TestWeixin_OAuth_Ctrl'
          }
        }
      })
      .state('tab.test-weixin.js', {
        url: '/js',
        views: {
          'test-weixin': {
            templateUrl: 'templates/test_weixin/js.html',
            controller: 'TestWeixin_js_Ctrl'
          }
        }
      })
      .state('tab.test-cordova', {
        url: '/test-cordova',
        views: {
          'tab-test-cordova': {
            templateUrl: 'templates/tab-test-cordova.html',
            controller: 'TestCordovaCtrl'
          }
        }
      })
      .state('tab.dash', {
        url: '/dash',
        views: {
          'tab-dash': {
            templateUrl: 'templates/tab-dash.html',
            controller: 'DashCtrl'
          }
        }
      })
      .state('tab.chats', {
        url: '/chats',
        views: {
          'tab-chats': {
            templateUrl: 'templates/tab-chats.html',
            controller: 'ChatsCtrl'
          }
        }
      })
      .state('tab.chat-detail', {
        url: '/chats/:chatId',
        views: {
          'tab-chats': {
            templateUrl: 'templates/chat-detail.html',
            controller: 'ChatDetailCtrl'
          }
        }
      })


      .state('tab.account', {
        url: '/account',
        views: {
          'tab-account': {
            templateUrl: 'templates/tab-account.html',
            controller: 'AccountCtrl'
          }
        }
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/dash');

  });
