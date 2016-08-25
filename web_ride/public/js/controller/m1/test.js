define(['app', 'common','socket'], function (myApp, common,io) {
    myApp.controller('m1_test_controller', ['$rootScope','$scope', '$scope', '$http', '$uibModal', 'component', '$cookieStore','$cookies','$location',
        function ($rootScope,$scope, s, $http, $uibModal, component, $cookieStore,$cookies,$location) {
            console.log("m1_test_controller");

            // ngAnimate 测试
            s.ngAnimate = {};
            s.ngAnimate.setAttr = function (attrName, value) {
                s.ngAnimate[attrName] = value;
            };

            s.ngAnimate.ngRepeat = {};
            s.ngAnimate.ngRepeat.add = function (index,value) {
                s.ngAnimate.ngRepeat.items.splice(index,0,value);
            };
            s.ngAnimate.ngRepeat.remove = function (index) {
                s.ngAnimate.ngRepeat.items.splice(index,1);
            };
            s.ngAnimate.ngRepeat.items = [
                "哈哈1",
                "哈哈2",
                "哈哈3"
            ];



            s.getCurrentCookies = function () {
                s.currentCookies = $cookies.getAll();
            };
            s.getCurrentCookies();

            s.newCookie = {};
            s.newCookie.key = "key";
            s.newCookie.value = "value";
            s.addCookie = function (key, value) {
                $cookieStore.put(key,value);
            };

            s.location = {};
            s.location.absUrl = $location.absUrl();
            s.location.host = $location.host();
            s.location.port = $location.port();
            s.location.protocol = $location.protocol();
            s.location.url = $location.url();

            // s.api.model.schema("User")
            //     .success(function (data) {
            //         console.log(data);
            //     });
            // s.api.model.schema("haha")
            //     .success(function (data) {
            //         console.log(data);
            //     });

            // // UI-ROUTER 的事件
            // $scope.$on('$stateChangeStart', function(evt, toState, toParams, fromState, fromParams) {
            //     console.log('$stateChangeStart');
            // });
            // $scope.$on('$stateChangeSuccess', function(evt, toState, toParams, fromState, fromParams) {
            //     console.log('$stateChangeSuccess');
            // });
            // $scope.$on('$stateChangeError', function(evt, toState, toParams, fromState, fromParams) {
            //     console.log('$stateChangeError');
            // });
            // $rootScope.$on('$stateChangeStart', function(evt, toState, toParams, fromState, fromParams) {
            //     console.log('$stateChangeStart');
            //     console.log(arguments);
            // });
            // $rootScope.$on('$stateChangeSuccess', function(evt, toState, toParams, fromState, fromParams) {
            //     console.log('$stateChangeSuccess');
            //     console.log(arguments);
            // });
            // $rootScope.$on('$stateChangeError', function(evt, toState, toParams, fromState, fromParams) {
            //     console.log('$stateChangeError');
            //     console.log(arguments);
            // });

            // // 自带事件
            // $rootScope.$on('$locationChangeStart', function(evt, toState, toParams, fromState, fromParams) {
            //     console.log('$locationChangeStart');
            //     console.log(arguments);
            // });
            // $rootScope.$on('$locationChangeSuccess', function(evt, toState, toParams, fromState, fromParams) {
            //     console.log('$locationChangeSuccess');
            //     console.log(arguments);
            // });

            // // ngRoute 的事件
            // $rootScope.$on('$routeChangeStart', function(evt, toState, toParams, fromState, fromParams) {
            //     console.log('$routeChangeStart');
            //     console.log(arguments);
            // });
            // $rootScope.$on('$routeChangeSuccess', function(evt, toState, toParams, fromState, fromParams) {
            //     console.log('$routeChangeSuccess');
            //     console.log(arguments);
            // });



            // //socket.io
            // var socket = $rootScope.socket;
            // socket.on('news', function (data) {
            //     console.log(data);
            //     socket.emit('my other event', { my: 'data' });
            // });
            //
            // socket.on('s-user', function (data) {
            //     console.log(data);
            // });
            //
            // s.sendSession = function () {
            //     socket.emit('c-mSession', { mSession: $cookies.get("mSession") });
            // };


            // ["a","b","c"].forEach(function () {
            //     console.log(arguments);
            // });

            // var expireDate = new Date();
            // expireDate.setDate(expireDate.getDate() + 1);
            // $cookieStore.put("m111",{aaa:"aaa"}, {'expires': expireDate.toUTCString()});
            // console.log($cookieStore.get("m111"));
            // // $cookieStore.remove("m111");
            //
            // var expireDate = new Date();
            // expireDate.setDate(expireDate.getDate() + 30);
            // $cookies.put('myFavorite', 'oatmeal', {'expires': expireDate.toUTCString()});
            // $cookies.put('test', JSON.stringify({aaa:"bbb"}) , {'expires': expireDate.toUTCString()});
            // console.log($cookieStore.get("test"));
            // // $cookieStore.remove("test");
            // // $cookies.remove("test");

            // console.log(common.stringHelp.isNumber(""));
            // console.log(common.stringHelp.toNumber(""));
            // console.log(common.timeHelp.number2String(1111111.5));
            // console.log(common.timeHelp.number2String(1));
            // console.log(common.timeHelp.number2String("1"));

            // console.log( common.strHelp.isEmptyStr("") );
            // console.log( common.strHelp.isEmptyStr() );
            // console.log( common.strHelp.isEmptyStr(null) );
            // console.log( common.strHelp.isEmptyStr(undefined) );
            // console.log( common.strHelp.isEmptyStr([]) );
            // console.log( common.strHelp.isEmptyStr("1") );

            // console.log( common.strHelp.isNotEmptyStr("") );
            // console.log( common.strHelp.isNotEmptyStr() );
            // console.log( common.strHelp.isNotEmptyStr(null) );
            // console.log( common.strHelp.isNotEmptyStr(undefined) );
            // console.log( common.strHelp.isNotEmptyStr([]) );
            // console.log( common.strHelp.isNotEmptyStr("1") );

            // console.log( common.strHelp.firstUpper("1fawefawe") );
            // console.log( common.strHelp.firstUpper("awefawe") );
            // console.log( common.strHelp.firstUpper("你好1fawefawe") );

            s.tab = "component";
            s.setTab = function (str) {
                s.tab = str;
            };


            //test 专用API
            s.testGetRelativePath = function () {
                s.api.robotNode.getRelativePath({
                        sourceId: "5774826e51a57da02438381f",
                        targetId: "5779bcb2ee4c303020b65d20"
                    })
                    .success(function (data) {
                        console.log(data);
                    });
            };


            //test api
            $scope.address = "";
            $scope.methods = ["GET", "POST"];
            $scope.method = $scope.methods[0];
            $scope.result = "";
            $scope.sendData = "";

            $scope.test = function () {

                var isJson = function (str) {
                    try {
                        JSON.parse(str);
                    } catch (e) {
                        return false;
                    }
                    return true;
                };
                var sendData = {};
                if (isJson($scope.sendData)) {
                    sendData = JSON.parse($scope.sendData)
                }
                $http({
                    method: $scope.method,
                    url: $scope.address,
                    dataType: "json",
                    data: sendData
                }).success(function (data, header, config, status) {
                    $scope.result = JSON.stringify(data);
                }).error(function (data, header, config, status) {
                    $scope.result = JSON.stringify(data);
                });
            };

            //test modal
            s.openInputModal = function () {
                s.modalOption = {
                    action: "New Test Case",
                    close: function (data) {
                        console.log(data);
                    },
                    dismiss: function (data) {
                        console.log(data);
                        console.log('Modal dismissed at: ' + new Date());
                    }
                };
                component.inputModal(s.modalOption);
            };
            s.openSearchModal = function () {
                s.modalOption = {
                    action: component.searchModal.option.action.searchResource,
                    close: function (data) {
                        console.log(data);
                    },
                    dismiss: function (data) {
                        console.log(data);
                    }
                };
                component.searchModal(s.modalOption);
            };
        }]);
});