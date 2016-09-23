angular.module('starter.controllers', [])
    .controller('M1Ctrl', ["$scope", "$rootScope", "$location", function (s, $rootScope, $location) {
      console.log("M1Ctrl");
    }])
    .controller('M1_TabsCtrl', ["$scope", "$rootScope", "$location", function (s, $rootScope, $location) {
      console.log("M1_TabsCtrl");
    }])
    .controller('M1_Tabs_ContentCtrl', ["$scope", "$rootScope", "$location", function (s, $rootScope, $location) {
      console.log("M1_Tabs_ContentCtrl");
    }])
    .controller('M1_Tabs_2levelCtrl', ["$scope", "$rootScope", "$location", function (s, $rootScope, $location) {
      console.log("M1_Tabs_2levelCtrl");
    }])
    .controller('M1_Tabs_2level_1Ctrl', ["$scope", "$rootScope", "$location", function (s, $rootScope, $location) {
      console.log("M1_Tabs_2level_1Ctrl");
    }])
    .controller('M1_Tabs_2level_2Ctrl', ["$scope", "$rootScope", "$location", function (s, $rootScope, $location) {
      console.log("M1_Tabs_2level_2Ctrl");
    }]);
