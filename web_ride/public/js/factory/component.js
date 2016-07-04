define(['app','jquery','common'], function (myApp,$,common) {
    myApp.factory('component', ['$uibModal', function ($uibModal) {

        var component = {};

        component.searchModal = function (option) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'view/component/search_modal.html',
                controller: ['$scope','$rootScope','$uibModalInstance',function ($scope,$rootScope,$uibModalInstance) {

                    var conf = component.searchModal.option;
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

                    switch (option.action) {
                        case conf.action.searchResource:

                            $scope.clickRow = function (result) {
                                if($scope.selectedResult){
                                    $scope.selectedResult.selected = false;
                                }
                                result.selected = true;
                                $scope.selectedResult = result;
                            };

                            $scope.api.robotNode.find({type: "resource"})
                                .success(function (data) {
                                    $scope.results = data.data;
                                    $scope.results.forEach(function (result) {
                                        $scope.api.robotNode.getParentList(result._id)
                                            .success(function (data) {
                                                var path = "";
                                                data.data.forEach(function (node) {
                                                    path += "/" + node.name;
                                                });
                                                result.abPath = path;
                                            });
                                    });
                                });
                            $scope.confirm = function () {
                                $uibModalInstance.close($scope.selectedResult);
                            };
                            break;
                        default:
                            $scope.confirm = function () {
                                $uibModalInstance.close("confirm");
                            };
                    }
                }],
                size: "auto",
                resolve: {
                }
            });
            modalInstance.result.then(option.close ,option.dismiss );
        };

        component.searchModal.option = {
            action:{
                //新建元素
                searchResource:"searchResource"
            }
        };



        component.inputModal = function (option) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'view/component/input_modal.html',
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
                        case conf.action.newDirectory:
                            $scope.robotNode.type = "other";
                            $scope.robotNode.fileType = "dir";
                            $scope.robotNode.fileFormat = "txt";
                            $scope.confirm = function () {
                                $uibModalInstance.close($scope.robotNode);
                            };
                            break;
                        case conf.action.newResource:
                            $scope.robotNode.type = "resource";
                            $scope.robotNode.fileType = "file";
                            $scope.robotNode.fileFormat = "txt";
                            $scope.confirm = function () {
                                $uibModalInstance.close($scope.robotNode);
                            };
                            break;
                        case conf.action.newUserKeyword:
                            $scope.robotNode.type = "keyword";
                            $scope.robotNode.fileType = "content";
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
                        case conf.action.editArguments:
                            $scope.confirm = function () {
                                $uibModalInstance.close($scope.data);
                            };
                            break;
                        case conf.action.editReturnValue:
                            $scope.confirm = function () {
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
                newDirectory:"New Directory",
                newResource:"New Resource",
                newUserKeyword:"New User Keyword",
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
                editArguments:"editArguments",
                editReturnValue:"editReturnValue",
                addLibrary:"addLibrary",
                addResource:"addResource",
                addVariables:"addVariables"
            }
        };

        return component;

    }]);
});