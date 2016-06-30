define(['app','common'], function(myApp,common){
    myApp.controller('m1_workspace_controller', ['$scope','component', function (s,component) {
        console.log("m1_workspace_controller");
        var projectId = s.$state.params.projectId;
        s.nodeTree = {};

        s.nodeTree.node = s.model.RobotNode.createNew();
        s.nodeTree.node.fn.findById(projectId)
            .success(function () {
            });

        s.modalConf = component.inputModal.option;

        s.editDocumentation = function (node) {
            var modalOption = {
                action: s.modalConf.action.editDocumentation,
                data:{
                    value: node.documentation,
                    comment : ""
                },
                close:function (data) {
                    node.documentation = data.value;
                    node.fn.update({documentation:node.documentation});
                },
                dismiss:function (data) {
                    console.log(data);
                }
            };
            component.inputModal(modalOption);
        };

        s.editValueCommentAttr = function (node,attrName) {
            var modalOption = {
                action: s.modalConf.action["edit" + common.strHelp.firstUpper(attrName)],
                data:node[attrName],
                close:function (data) {
                    node[attrName] = data;
                    var updateData = {};
                    updateData[attrName] = node[attrName];
                    node.fn.update(updateData);
                },
                dismiss:function (data) {
                    console.log(data);
                }
            };
            component.inputModal(modalOption);
        };

        s.showSettings = false;
        s.changeShowSettings = function () {
            s.showSettings = !s.showSettings;
        };

        s.getChildren = function (node) {
            node.fn.getChildren();
        };

        s.addCell = function (cells) {
            cells.push({
                text:""
            });
        };
        s.removeCell = function (cells) {
            cells.pop();
        };

        s.addRow = function (rows) {
            rows.push({
                cells:[]
            });
        };
        s.removeRow = function (rows) {
            rows.pop();
        };

        s.saveForm = function (node) {
            node.fn.update({form:node.form});
        };

        s.createProjectFiles = function () {
            s.api.action.createProjectFiles(projectId)
                .success(function (data) {
                    console.log(data);
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
            console.log(node);
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
                $event.stopPropagation();
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