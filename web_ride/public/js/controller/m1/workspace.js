define(['app'], function(myApp){
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
        s.editSetup = function (node) {
            var modalOption = {
                action: s.modalConf.action.editSetup,
                data:node.setup,
                close:function (data) {
                    console.log(data);
                    node.setup = data;
                    node.fn.update({setup:node.setup});
                },
                dismiss:function (data) {
                    console.log(data);
                }
            };
            component.inputModal(modalOption);
        };
        s.editTeardown = function (node) {
            var modalOption = {
                action: s.modalConf.action.editTeardown,
                data:node.teardown,
                close:function (data) {
                    node.teardown = data;
                    node.fn.update({teardown:node.teardown});
                },
                dismiss:function (data) {
                    console.log(data);
                }
            };
            component.inputModal(modalOption);
        };
        s.editTemplate  = function (node) {
            var modalOption = {
                action: s.modalConf.action.editTemplate,
                data:node.template,
                close:function (data) {
                    node.template = data;
                    node.fn.update({template:node.template});
                },
                dismiss:function (data) {
                    console.log(data);
                }
            };
            component.inputModal(modalOption);
        };
        s.editTimeout  = function (node) {
            var modalOption = {
                action: s.modalConf.action.editTimeout,
                data:node.timeout,
                close:function (data) {
                    node.timeout = data;
                    node.fn.update({timeout:node.timeout});
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

        s.addCol = function (cols) {
            cols.push({
                text:""
            });
        };
        s.removeCol = function (cols) {
            cols.pop();
        };

        s.addRow = function (rows) {
            rows.push({
                cols:[]
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