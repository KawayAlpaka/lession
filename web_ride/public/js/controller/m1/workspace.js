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
            var sendData = pNode;
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
                    console.log(data);
                });
        };
        s.getChildren = function (node) {
            s.api.robotNode.getChildren(node._id)
                .success(function (data) {
                    node.children = data.data;
                });
        }
    }]);
    myApp.controller('m1_workspace_edit_controller', ['$scope', function (s) {
        console.log("m1_workspace_edit_controller");
        console.log(s.$state.params.robotNodeId);
    }]);
});