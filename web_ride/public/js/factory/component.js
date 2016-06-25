define(['app'], function (myApp) {
    myApp.factory('component', ['$uibModal', function ($uibModal) {

        var component = {};

        component.inputModal = function (option) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'view/component/inputModal.html',
                controller: ['$scope','$rootScope','$uibModalInstance',function ($scope,$rootScope,$uibModalInstance) {
                    $scope.data = option;
                    // console.log($uibModalInstance.resolve);
                    $scope.confirm = function () {
                        $uibModalInstance.close($scope.data);
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
            modalInstance.result.then(option.close,option.dismiss );
        };

        return component;

    }]);
});