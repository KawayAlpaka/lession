angular.module('starter.controllers', [])

.controller('TestCordovaCtrl',["$scope","$rootScope","$location" ,function(s,$rootScope,$location) {
  console.log("TestCordovaCtrl");
  
  s.location = {};
  s.location.absUrl = $location.absUrl();
  s.location.host = $location.host();
  s.location.port = $location.port();
  s.location.protocol = $location.protocol();
  s.location.url = $location.url();

  s.getDevice = function () {
    // console.log(cordova);
    console.log(device.platform);
    s.device = device;
  };

  s.setTestPlugin = function (value) {
    s.testPlugin = value;
  };


  s.imageUrl = "还没有上传";
  s.testCamera = function () {
    navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
      destinationType: Camera.DestinationType.FILE_URI });
      // destinationType: Camera.DestinationType.DATA_URL });

    function onSuccess(imageURI) {
      var image = document.getElementById('myImage');
      image.src = imageURI;
      s.imageUrl = imageURI;
      console.log(s.imageUrl);
      s.$apply();
    }

    // function onSuccess(imageData) {
    //   var image = document.getElementById('myImage');
    //   image.src = "data:image/jpeg;base64," + imageData;
    // }

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
