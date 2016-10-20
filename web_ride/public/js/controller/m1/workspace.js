define(['app','common','jquery'], function(myApp,common,$){
    myApp.controller('m1_workspace_controller', ['$scope','component','mIo', function (s,component,mIo) {
        console.log("m1_workspace_controller");
        var projectId = s.$state.params.projectId;

        s.nodeTree = {};

        s.nodeTree.node = s.model.RobotNode.createNew();
        s.nodeTree.node.fn.findById(projectId)
            .success(function () {
                mIo.currentProject(projectId);
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
                    node.fn.update({documentation:data.value});
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
                    var updateData = {};
                    updateData[attrName] = node[attrName];
                    node.fn.update(updateData)
                        .success(function () {
                            node[attrName] = data;
                        });
                },
                dismiss:function (data) {
                    console.log(data);
                }
            };
            component.inputModal(modalOption);
        };
        s.addTag = function (tags) {
            tags.push({text:""});
        };
        s.delTag = function (tags,tagName) {
            tags.pop();
            var updateData = {};
            updateData[tagName] = s.editingNode[tagName];
            s.editingNode.fn.update(updateData)
                .success(function () {
                });
        };
        var tagText = "";
        s.tagBlur = function (tag,tagName) {
            if(tagText == tag.text){
                //
            }else{
                var updateData = {};
                updateData[tagName] = s.editingNode[tagName];
                s.editingNode.fn.update(updateData)
                    .success(function () {
                    });
            }
        };
        s.tagFocus = function (tag) {
            tagText = tag.text;
        };
        
        s.addImport = function (node,action) {
            console.log(s.editingNode);
            var modalOption = {
                action: s.modalConf.action[action],
                // data:node[attrName],
                editingNode: s.editingNode,
                close:function (data) {
                    var imports = $.extend([],node.imports);
                    imports.push(data);
                    var updateData = {imports:imports};
                    node.fn.update(updateData)
                        .success(function () {
                            node.imports = imports;
                        });
                },
                dismiss:function (data) {
                    console.log(data);
                }
            };
            component.inputModal(modalOption);
        };

        s.deleteImport = function (node,index) {
            var imports = $.extend([],node.imports);
            imports.splice(index,1);
            node.fn.update({imports:imports})
                .success(function () {
                    node.imports = imports;
                });
        };

        s.addVariable = function (node,action) {
            var modalOption = {
                action: s.modalConf.action[action],
                // data:node[attrName],
                editingNode: s.editingNode,
                close:function (data) {
                    if(data.type == "List" || data.type == "Dict" ){
                        var noEmptyLenght = _.findLastIndex(data.arrayValue,function (item) {
                            return item.text.length > 0;
                        });
                        data.arrayValue = data.arrayValue.slice(0, noEmptyLenght + 1);
                    }
                    var variables = $.extend([],node.variables);
                    variables.push(data);
                    var updateData = {variables:variables};
                    node.fn.update(updateData)
                        .success(function () {
                            node.variables = variables;
                        });
                },
                dismiss:function (data) {
                    console.log(data);
                }
            };
            component.inputModal(modalOption);
        };

        s.deleteVariable = function (node,index) {
            var variables = $.extend([],node.variables);
            variables.splice(index,1);
            node.fn.update({variables:variables})
                .success(function () {
                    node.variables = variables;
                });
        };

        s.currentPanel = "edit";
        s.setCurrentPanel = function (value) {
            s.currentPanel = value;
        };


        s.array2ShowString = function (array) {
            var tempArray = $.extend([],array);
            var tempArray2 = [];
            tempArray.forEach(function (item) {
               if(item.text.length == 0){
                   // item.text = "|";
                   tempArray2.push("|")
               }else{
                   tempArray2.push(item.text);
               }

            });
            return tempArray2.join(" | ");
        };

        s.showSettings = false;
        s.changeShowSettings = function () {
            s.showSettings = !s.showSettings;
        };

        s.getChildren = function (node) {
            node.fn.getChildren();
        };

        // 表格操作
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
        s.runProject = function () {
            s.api.action.runProject(projectId)
                .success(function (data) {
                    console.log(data);
                });
        };
        s.downloadProjectFiles = function () {
            s.mHelp.open('/api/actions/downloadProjectFiles/'+projectId);
        };

        // // 不需要遍历元素
        // s.ergodicTree = function (children) {
        //     if(children){
        //         children.forEach(function (node) {
        //             node.showState.selected = false;
        //             s.ergodicTree(node.children);
        //         });
        //     }
        // };

        var selectNode = function (node) {
            console.log(node);

            // 获取子节点
            if(node.children.length == 0){
                s.getChildren(node);
            }

            node.fn.pull();   //刷新本节点

            s.setSelectedNode(node);
        };

        s.treeFunctions = {
            getChildren:s.getChildren,
            click: function (node) {
                selectNode(node);
            },
            rightClick:function (node,$event) {
                $event.stopPropagation();
                selectNode(node);
                s.setRightClickNode(node);
                s.setRightClickNodeType("node");
                s.setContextMenuPoint($event.clientX,$event.clientY);
                s.setShowContextMenu(true);
            }
        };

        ////不采用右键删除方案
        // s.rightClickImport = function (editingNode,iImport,index,$event) {
        //     $event.stopPropagation();
        //     s.setRightClickNode(iImport);
        //     s.setRightClickNodeType("import");
        //     s.setContextMenuPoint($event.clientX,$event.clientY);
        //     s.setShowContextMenu(true);
        // }

        s.$on("nodeUpdate", function (event, data) {
            if (data._id == s.editingNode._id) {
                $.extend(s.editingNode, data);
                s.$apply();
            }
        });


        s.debug = {};
        s.debug.getDebugOptions = function () {
            s.api.debugOption.list()
                .success(function (data) {
                    s.debug.options = data.data
                });
        };

        s.debug.process = [];
        s.debug.result = [];
        s.debug.getDebugOptions();
        s.debug.run = function () {
            s.debug.process = [];
            s.debug.result = [];
            mIo.debug(projectId,_.filter(s.debug.options,function (option) {
                return option.ck == true;
            }));
        };
        s.$on("debugResult", function (event, data) {
            s.debug.result = data.result.split("\r\n");
            // s.debug.result.push(data.result);
            s.$apply();
        });
        s.$on("debugProcess", function (event, data) {
            s.debug.process.push(data.result);
            s.$apply();
        });

    }]);

    myApp.controller('m1_workspace_edit_controller', ['$scope', function (s) {
        console.log("m1_workspace_edit_controller");
        console.log(s.$state.params.robotNodeId);
    }]);
});