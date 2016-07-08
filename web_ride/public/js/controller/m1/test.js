define(['app', 'common','socket'], function (myApp, common,io) {
    myApp.controller('m1_test_controller', ['$scope', '$scope', '$http', '$uibModal', 'component', '$cookieStore','$cookies',
        function ($scope, s, $http, $uibModal, component, $cookieStore,$cookies) {
            console.log("m1_test_controller");

            // var socket = io.connect();
            // socket.on('news', function (data) {
            //     console.log(data);
            //     socket.emit('my other event', { my: 'data' });
            // });

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