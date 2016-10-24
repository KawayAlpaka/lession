define(['app', 'controller/m1/home', 'controller/m1/workspace', 'controller/m1/manage', 'controller/m1/user',
    'controller/m1/admin', 'controller/m1/test', 'controller/m1/project','controller/m1/user_center'], function (myApp) {
    myApp.controller('m1_controller', ['$scope', 'component', '$cookies', 'mIo', function (s, component, $cookies, mIo) {
        console.log("m1_controller");


        //右键菜单逻辑
        s.setSelectedNode = function (node) {
            if (s.selectedNode) {
                s.selectedNode.showState.selected = false;
            }

            s.selectedNode = node;
            s.selectedNode.showState.selected = true;

            s.editingNode = node;
            mIo.currentNode(s.editingNode._id);
        };
        s.setRightClickNode = function (node) {
            s.rightClickNode = node;
        };
        s.setRightClickNodeType = function (type) {
            s.rightClickNodeType = type;
        };

        s.setShowContextMenu = function (bool) {
            s.showContextMenu = bool;
        };
        s.setContextMenuPoint = function (x, y) {
            s.contextMenu.point.x = x;
            s.contextMenu.point.y = y;
            s.contextMenu.style = {
                "top": y + "px",
                "left": x + "px"
            }
        };
        s.contextMenu = {};
        s.contextMenu.point = {};
        s.showContextMenu = false;

        s.contextMenuFunctions = {
            click: function (action) {

                switch (s.rightClickNodeType) {
                    case "node":
                        if (action == "Refresh") {
                            console.log(s.selectedNode);
                            s.selectedNode.fn.pull();
                            s.selectedNode.fn.getChildren();
                            break;
                        } else {
                            var modalOption = {
                                action: action,
                                close: function (data) {
                                    data.parent = s.selectedNode._id;
                                    s.api.robotNode.create(data)
                                        .success(function () {
                                            s.selectedNode.fn.getChildren();
                                        });
                                },
                                dismiss: function (data) {
                                    console.log(data);
                                }
                            };
                            component.inputModal(modalOption);
                            break;
                        }
                    case "import":
                        if (action == "Delete") {
                            //
                        }
                        break;
                    default:
                        // $scope.confirm = function () {
                        //     $uibModalInstance.close("confirm");
                        // };
                }
                s.showContextMenu = false;
            }
        };

        s.logout = function () {
            s.api.user.logout()
                .success(function () {
                    s.mHelp.clearLoginData();
                    s.mHelp.go("#/m1/home");
                })
                .error(function () {
                    s.mHelp.clearLoginData();
                    s.mHelp.go("#/m1/home");
                });
        };

    }]);
});