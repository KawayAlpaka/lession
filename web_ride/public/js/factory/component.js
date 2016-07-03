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
                            $scope.robotNode.fileType = "content";
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
                        //用例属性
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
                                if(common.strHelp.isNumber($scope.data.value)){
                                    $scope.data.value = common.timeHelp.number2String($scope.data.value);
                                }
                                $uibModalInstance.close($scope.data);
                            };
                            break;
                        //套件属性
                        case conf.action.editSuiteSetup:
                            $scope.confirm = function () {
                                $uibModalInstance.close($scope.data);
                            };
                            break;
                        case conf.action.editSuiteTeardown:
                            $scope.confirm = function () {
                                $uibModalInstance.close($scope.data);
                            };
                            break;
                        case conf.action.editTestSetup:
                            $scope.confirm = function () {
                                $uibModalInstance.close($scope.data);
                            };
                            break;
                        case conf.action.editTestTeardown:
                            $scope.confirm = function () {
                                $uibModalInstance.close($scope.data);
                            };
                            break;
                        case conf.action.editTestTemplate:
                            $scope.confirm = function () {
                                $uibModalInstance.close($scope.data);
                            };
                            break;
                        case conf.action.editTestTimeout:
                            $scope.confirm = function () {
                                if(common.strHelp.isNumber($scope.data.value)){
                                    $scope.data.value = common.timeHelp.number2String($scope.data.value);
                                }
                                $uibModalInstance.close($scope.data);
                            };
                            break;
                        case conf.action.addLibrary:
                            $scope.confirm = function () {
                                $scope.data.type = "Library";
                                $uibModalInstance.close($scope.data);
                            };
                            break;
                        case conf.action.addResource:
                            $scope.confirm = function () {
                                $scope.data.type = "Resource";
                                $uibModalInstance.close($scope.data);
                            };
                            break;
                        case conf.action.addVariables:
                            $scope.confirm = function () {
                                $scope.data.type = "Variables";
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
                //新建元素
                newProject:"New Project",
                newTestCase:"New Test Case",
                newSuite:"New Suite",
                //编辑属性-通用属性
                editDocumentation:"Edit Documentation",
                //编辑属性-用例属性
                editSetup:"Edit Setup",
                editTeardown:"Edit Teardown",
                editTemplate:"Edit Template",
                editTimeout:"editTimeout",
                //编辑属性-套件属性
                editSuiteSetup:"editSuiteSetup",
                editSuiteTeardown:"editSuiteTeardown",
                editTestSetup:"editTestSetup",
                editTestTeardown:"editTestTeardown",
                editTestTemplate:"editTestTemplate",
                editTestTimeout:"editTestTimeout",
                addLibrary:"addLibrary",
                addResource:"addResource",
                addVariables:"addVariables"
            }
        };

        return component;

    }]);
});