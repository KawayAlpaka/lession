define(['app','controller/m1/home','controller/m1/workspace','controller/m1/manage','controller/m1/test'], function(myApp){
    myApp.controller('m1_controller', ['$scope','component', function (s,component) {
        console.log("m1_controller");

        s.setSelectedNode = function (node) {
            s.selectedNode = node;
            s.editingNode = node;
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
        s.setContextMenuPoint = function (x,y ) {
            s.contextMenu.point.x = x;
            s.contextMenu.point.y = y;
            s.contextMenu.style = {
                "top" :  y + "px",
                "left" : x + "px"
            }
        };
        s.contextMenu = {};
        s.contextMenu.point = {};
        s.showContextMenu = false;

        s.contextMenuFunctions = {
            click:function (action) {

                switch (s.rightClickNodeType){
                    case "node":
                    var modalOption = {
                        action: action,
                        close:function (data) {
                            data.parent = s.selectedNode._id;
                            console.log(data);
                            s.api.robotNode.create(data)
                                .success(function (data) {

                                });
                        },
                        dismiss:function (data) {
                            console.log(data);
                        }
                    };
                    component.inputModal(modalOption);
                    break;
                    case "import":
                        if(action == "Delete"){
                            //
                        }
                        break;
                    default:
                        $scope.confirm = function () {
                            $uibModalInstance.close("confirm");
                        };
                }
                s.showContextMenu = false;
            }
        };
        
    }]);
});