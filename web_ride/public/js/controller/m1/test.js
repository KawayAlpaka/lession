define(['app'], function(myApp){
    myApp.controller('m1_test_controller', ['$scope','$scope','$http','$uibModal','component', function ($scope,s,$http,$uibModal,component) {
        console.log("m1_test_controller");

        
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