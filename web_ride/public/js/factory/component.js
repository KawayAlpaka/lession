define(['app','jquery','common'], function (myApp,$,common) {
    myApp.factory('component', ['$uibModal', function ($uibModal) {

        var component = {};
        component.inputModal = function (option) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'view/component/inputModal.html',
                controller: ['$scope','$rootScope','$uibModalInstance',function ($scope,$rootScope,$uibModalInstance) {

                    var conf = component.inputModal.option;
                    $scope.conf = conf;

                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };
                    $scope.action = option.action;
                    if (option.data){
                        $scope.data = $.extend({},option.data);
                    }else{
                        $scope.data = {};
                    }

                    $scope.robotNode = {};
                    $scope.robotNode.name = "";
                    console.log(option.action);
                    console.log(option.action);
                    switch(option.action)
                    {
                        case conf.action.newProject:
                            $scope.robotNode.type = "project";
                            $scope.robotNode.fileType = "file";
                            $scope.robotNode.fileFormat = "txt";
                            $scope.confirm = function () {
                                $uibModalInstance.close($scope.robotNode);
                            };
                            break;
                        case conf.action.newTestCase:
                            $scope.robotNode.type = "case";
                            $scope.confirm = function () {
                                $uibModalInstance.close($scope.robotNode);
                            };
                            break;
                        case conf.action.newSuite:
                            $scope.robotNode.type = "suite";
                            $scope.robotNode.fileType = "file";
                            $scope.robotNode.fileFormat = "txt";
                            $scope.confirm = function () {
                                $uibModalInstance.close($scope.robotNode);
                            };
                            break;
                        case conf.action.editDocumentation:
                            $scope.confirm = function () {
                                $uibModalInstance.close($scope.data);
                            };
                            break;
                        case conf.action.editSetup:
                            $scope.confirm = function () {
                                $uibModalInstance.close($scope.data);
                            };
                        case conf.action.editTeardown:
                            $scope.confirm = function () {
                                $uibModalInstance.close($scope.data);
                            };
                            break;
                        case conf.action.editTemplate:
                            $scope.confirm = function () {
                                $uibModalInstance.close($scope.data);
                            };
                            break;
                        case conf.action.editTimeout:
                            $scope.confirm = function () {
                                if(common.stringHelp.isNumber($scope.data.value)){
                                    $scope.data.value = common.timeHelp.number2String($scope.data.value);
                                }
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

        component.inputModal.option = {
            action:{
                newProject:"New Project",
                newTestCase:"New TestCase",
                newSuite:"New Suite",
                editDocumentation:"Edit Documentation",
                editSetup:"Edit Setup",
                editTeardown:"Edit Teardown",
                editTemplate:"Edit Template",
                editTimeout:"editTimeout"
            }
        };

        return component;

    }]);
});