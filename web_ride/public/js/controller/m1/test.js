define(['app','common'], function(myApp , common){
    myApp.controller('m1_test_controller', ['$scope','$scope','$http','$uibModal','component', function ($scope,s,$http,$uibModal,component) {
        console.log("m1_test_controller");
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

        console.log( common.strHelp.isNotEmptyStr("") );
        console.log( common.strHelp.isNotEmptyStr() );
        console.log( common.strHelp.isNotEmptyStr(null) );
        console.log( common.strHelp.isNotEmptyStr(undefined) );
        console.log( common.strHelp.isNotEmptyStr([]) );
        console.log( common.strHelp.isNotEmptyStr("1") );

        s.tab = "component";
        s.setTab = function (str) {
            s.tab = str;
        };

        //test api
        $scope.address = "";
        $scope.methods = ["GET","POST"];
        $scope.method = $scope.methods[0];
        $scope.result = "";
        $scope.sendData = "";

        $scope.test = function () {

            var isJson = function(str) {
                try {
                    JSON.parse(str);
                } catch (e) {
                    return false;
                }
                return true;
            };
            var sendData = {};
            if(isJson($scope.sendData)){
                sendData = JSON.parse($scope.sendData)
            }
            $http({
                method:$scope.method,
                url:$scope.address,
                dataType: "json",
                data: sendData
            }).success(function (data, header, config, status) {
                $scope.result = JSON.stringify(data);
            }).error(function (data, header, config, status) {
                $scope.result = JSON.stringify(data);
            });
        };

        //test modal
        s.openModal = function () {
            s.modalOption = {
                action:"New Test Case",
                close:function (data) {
                    console.log(data);
                },
                dismiss:function (data) {
                    console.log(data);
                    console.log('Modal dismissed at: ' + new Date());
                }
            };
            component.inputModal(s.modalOption);
        }


    }]);
});