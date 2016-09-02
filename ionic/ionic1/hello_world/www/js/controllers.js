angular.module('starter.controllers', [])

  .controller('TestWeixinCtrl', ["$scope", "$rootScope", "$location", function (s, $rootScope, $location) {
    console.log("TestWeixinCtrl");
  }])
  .controller('TestWeixin_OAuth_Ctrl', ["$scope", "$rootScope", "$location", function (s, $rootScope, $location) {
    console.log("TestWeixin_OAuth_Ctrl");
    s.getOpenId = function () {
      console.log("getOpenId");
      // window.open("www.baidu.com");
      window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx13f06fd9ec831ed6&redirect_uri=http%3A%2F%2Fwww.yangtuos.com%2FOAuth&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
    };
  }])
  .controller('TestWeixin_js_Ctrl', ["$scope", "$rootScope", "$location", function (s, $rootScope, $location) {
    console.log("TestWeixin_js_Ctrl");
  }])

  .controller('TestCordovaCtrl', ["$scope", "$rootScope", "$location", function (s, $rootScope, $location) {
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
      navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI
      });
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

    s.getGeolocation = function () {
// onSuccess Callback
// This method accepts a Position object, which contains the
// current GPS coordinates
//
      var onSuccess = function (position) {
        alert('Latitude: ' + position.coords.latitude + '\n' +
          'Longitude: ' + position.coords.longitude + '\n' +
          'Altitude: ' + position.coords.altitude + '\n' +
          'Accuracy: ' + position.coords.accuracy + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
          'Heading: ' + position.coords.heading + '\n' +
          'Speed: ' + position.coords.speed + '\n' +
          'Timestamp: ' + position.timestamp + '\n');
      };

// onError Callback receives a PositionError object
//
      function onError(error) {
        alert('code: ' + error.code + '\n' +
          'message: ' + error.message + '\n');
      }

      navigator.geolocation.getCurrentPosition(onSuccess, onError);

    };

  }])

  .controller('DashCtrl', function ($scope) {
  })

  .controller('ChatsCtrl', function ($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
      Chats.remove(chat);
    };
  })

  .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('AccountCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });
