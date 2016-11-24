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
    .controller('M1_Tabs_ContentCtrl', ["$scope", "$rootScope", "$location", function (s, $rootScope, $location) {
        console.log("M1_Tabs_ContentCtrl");
        s.setTabName("content");
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
    .controller('M1_Tabs_SettingsCtrl', ["$scope", "$rootScope", "$location","$cookies", function (s, $rootScope, $location,$cookies) {
        console.log("M1_Tabs_SettingsCtrl");
        s.setTabName("Settings");
        s.getOpenID = function () {
            console.log("getOpenID");
            window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx13f06fd9ec831ed6&redirect_uri=http%3A%2F%2Fweixin.yangtuos.com%2FOAuth&response_type=code&scope=snsapi_base&state="+encodeURIComponent("/#/m1/tabs/settings")+"#wechat_redirect";
        };
        s.openid = $cookies.get("openid");
        // console.log(encodeURI("#"));
        // console.log(encodeURIComponent("#"));
        s.scanQRCode = function () {
            wx.scanQRCode({
                needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                success: function (res) {
                    var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                    console.log(res);
                    s.scanQRCodeRes = JSON.stringify(res);
                    s.$apply();
                }
            });
        };
    }]);
