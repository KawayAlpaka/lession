define(['app'], function (myApp) {
    myApp.factory('component', ['$uibModal', function ($uibModal) {

        var component = {};

        component.inputModal = function (option) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'view/component/inputModal.html',
                controller: ['$scope','$rootScope','$uibModalInstance',function ($scope,$rootScope,$uibModalInstance) {
                    $scope.option = option;

                    $scope.robotNode = {};
                    $scope.robotNode.name = "";
                    $scope.robotNode.type = "project";
                    $scope.robotNode.fileType = "file";
                    $scope.robotNode.fileFormat = "txt";
                    $scope.confirm = function () {
                        $uibModalInstance.close($scope.robotNode);
                    };
                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };
                }],
                size: "auto",
                // scope: $scope,
                resolve: {
                    // items: function () {
                    //     console.log("resolve items");
                    //     return option;
                    // }
                }
            });
            modalInstance.result.then(option.close ,option.dismiss );
        };

        return component;

    }]);
});