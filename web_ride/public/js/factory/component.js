define(['app'], function (myApp) {
    myApp.factory('component', ['$uibModal', function ($uibModal) {

        var component = {};

        component.inputModal = function (option) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'view/component/inputModal.html',
                controller: ['$scope','$rootScope','$uibModalInstance',function ($scope,$rootScope,$uibModalInstance) {

                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };
                    $scope.action = option.action;
                    $scope.data = option.data;

                    $scope.robotNode = {};
                    $scope.robotNode.name = "";
                    switch(option.action)
                    {
                        case "New Project":
                            $scope.robotNode.type = "project";
                            $scope.robotNode.fileType = "file";
                            $scope.robotNode.fileFormat = "txt";
                            $scope.confirm = function () {
                                $uibModalInstance.close($scope.robotNode);
                            };
                            break;
                        case "New Test Case":
                            $scope.robotNode.type = "case";
                            $scope.confirm = function () {
                                $uibModalInstance.close($scope.robotNode);
                            };
                            break;
                        case "New Suite":
                            $scope.robotNode.type = "suite";
                            $scope.robotNode.fileType = "file";
                            $scope.robotNode.fileFormat = "txt";
                            $scope.confirm = function () {
                                $uibModalInstance.close($scope.robotNode);
                            };
                            break;
                        case "Edit Documentation":
                            $scope.confirm = function () {
                                console.log($scope.data);
                                $uibModalInstance.close($scope.data);
                            };
                            break;
                        default:
                            $scope.confirm = function () {
                                $uibModalInstance.close("confirm");
                            };
                    }


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