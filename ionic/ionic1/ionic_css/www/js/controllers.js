angular.module('starter.controllers', [])
    .controller('M1Ctrl', ["$scope", "$rootScope", "$location", function (s, $rootScope, $location) {
        console.log("M1Ctrl");
    }])
    .controller('M1_TabsCtrl', ["$scope", "$rootScope", "$location", function (s, $rootScope, $location) {
        console.log("M1_TabsCtrl");
        s.setTabName = function (value) {
            s.tabName = value;
        };
    }])
    .controller('M1_Tabs_ContentCtrl', ["$scope","$scope" ,"$rootScope","$ionicModal", function (s,$scope,$rootScope, $ionicModal) {
        console.log("M1_Tabs_ContentCtrl");
        s.setTabName("content");
        $ionicModal.fromTemplateUrl('templates/modal/modal.html', {
            // scope: $scope,
            scope: $scope,
            animation: 'slide-in-up',
            controller:function () {
                console.log(2);
            }
        }).then(function(modal) {
            console.log("init");
            $scope.modal = modal;
        });
        $scope.openModal = function() {
            console.log("openModal");
            $scope.modal.show();
        };
        $scope.closeModal = function() {
            console.log("closeModal");
            $scope.modal.hide();
        };
        //当我们用到模型时，清除它！
        $scope.$on('$destroy', function() {
            console.log('$destroy');
            $scope.modal.remove();
        });
        // 当隐藏的模型时执行动作
        $scope.$on('modal.hide', function() {
            console.log('modal.hide');
            // 执行动作
        });
        // 当移动模型时执行动作
        $scope.$on('modal.removed', function() {
            console.log('modal.removed');
            // 执行动作
        });

    }])
    .controller('M1_Tabs_JsCtrl', ["$scope", "$rootScope", "$location", function (s, $rootScope, $location) {
        console.log("M1_Tabs_JsCtrl");
        s.setTabName("JS");
        s.scanQRCode = function () {
            wx.scanQRCode({
                needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                success: function (res) {
                    console.log(1);
                    var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                    console.log(res);
                    s.scanQRCodeRes = JSON.stringify(res);
                    s.$apply();
                }
            });
        };
        s.getLocation = function () {
            wx.getLocation({
                type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function (res) {
                    var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                    var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                    var speed = res.speed; // 速度，以米/每秒计
                    var accuracy = res.accuracy; // 位置精度
                    console.log(res);
                    s.getLocationRes = JSON.stringify(res);
                    s.$apply();
                }
            });
        };
        s.openLocation = function () {
            wx.getLocation({
                type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function (res) {
                    var location = res;
                    location.name = "name";
                    location.address = "address";
                    location.scale = "1";
                    location.infoUrl = "http://www.baidu.com";
                    wx.openLocation(location);
                }
            });
        };
        s.getNetworkType = function () {
            wx.getNetworkType({
                success: function (res) {
                    var networkType = res.networkType; // 返回网络类型2g，3g，4g，wifi
                    console.log(networkType);
                    s.getNetworkTypeRes = networkType;
                    s.$apply();
                }
            });
        };
    }])
    .controller('M1_Tabs_2levelCtrl', ["$scope", "$rootScope", "$location", function (s, $rootScope, $location) {
        console.log("M1_Tabs_2levelCtrl");
        s.setTabName("Two Level");
    }])
    .controller('M1_Tabs_2level_1Ctrl', ["$scope", "$rootScope", "$location", function (s, $rootScope, $location) {
        console.log("M1_Tabs_2level_1Ctrl");
    }])
    .controller('M1_Tabs_2level_2Ctrl', ["$scope", "$rootScope", "$location", function (s, $rootScope, $location) {
        console.log("M1_Tabs_2level_2Ctrl");
    }])
    .controller('M1_Tabs_SettingsCtrl', ["$scope", "$rootScope", "$location","$cookies","$http", function (s, $rootScope, $location,$cookies,$http) {
        console.log("M1_Tabs_SettingsCtrl");
        s.setTabName("Settings");
        s.getOpenID = function () {
            console.log("getOpenID");
            window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx13f06fd9ec831ed6&redirect_uri=http%3A%2F%2Fweixin.yangtuos.com%2FOAuth&response_type=code&scope=snsapi_base&state="+encodeURIComponent("/#/m1/tabs/settings")+"#wechat_redirect";
        };
        s.openid = $cookies.get("openid");
        // console.log(encodeURI("#"));
        // console.log(encodeURIComponent("#"));

        s.updateAccessToken = function () {
            $http({
                url: '/api/access_tokens' ,
                method: 'PUT'
            }).success(function (res) {
                console.log(res);
            });
        };
    }]);
