define(['app'], function(myApp){
    myApp.controller('m1_workspace_controller', ['$scope', function (s) {
        console.log("m1_workspace_controller");
        var projectId = s.$state.params.projectId;
        console.log(s.$state.params.projectId);
        s.nodeTree = {};
        s.api.robotNode.findById(projectId)
            .success(function (data) {
                s.nodeTree.node = data.data;
                console.log(data);
            });
        s.addSuite = function (pNode) {
            console.log("addSuite");
            var sendData = jQuery.extend(true,{}, pNode);
            sendData.name = "新建套件";
            sendData.fileType = "file";
            sendData.fileFormat = "txt";
            sendData.type = "suite";
            sendData.parent = pNode._id;
            delete sendData._id;
            delete sendData.__v;
            delete sendData.meta;
            s.api.robotNode.create(sendData)
                .success(function (data) {
                    s.getChildren(pNode);
                });
        };

        s.getChildren = function (node) {
            console.log("getChildren");
            s.api.robotNode.getChildren(node._id)
                .success(function (data) {
                    node.children = data.data;
                });
        };

        

        s.ergodicTree = function (children) {
            if(children){
                children.forEach(function (node) {
                    node.selected = false;
                    s.ergodicTree(node.children);
                });
            }
        };

        var selectNode = function (node) {
            s.getChildren(node);
            s.nodeTree.node.selected = false;
            s.ergodicTree(s.nodeTree.node.children);
            node.selected = true;
            s.setSelectedNode(node);
        };

        s.treeFunctions = {
            getChildren:s.getChildren,
            clickNode: function (node) {
                selectNode(node);
            },
            rightClickNode:function (node,$event) {
                console.log($event);
                selectNode(node);
                s.setContextMenuPoint($event.clientX,$event.clientY);
                s.setShowContextMenu(true);
            }
        };

    }]);
    myApp.controller('m1_workspace_edit_controller', ['$scope', function (s) {
        console.log("m1_workspace_edit_controller");
        console.log(s.$state.params.robotNodeId);
    }]);
});