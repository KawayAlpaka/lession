angular.module('starter.controllers', [])

.controller('TestCordovaCtrl',["$scope","$rootScope" ,function(s,$rootScope) {
  console.log("TestCordovaCtrl");

  s.getDevice = function () {
    // console.log(cordova);
    console.log(device.platform);
    s.device = device;
  };

  s.setTestPlugin = function (value) {
    s.testPlugin = value;
  };

  s.testCamera = function () {
    navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
      destinationType: Camera.DestinationType.FILE_URI });

    function onSuccess(imageURI) {
      var image = document.getElementById('myImage');
      image.src = imageURI;
    }

    function onFail(message) {
      alert('Failed because: ' + message);
    }
  };

}])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
