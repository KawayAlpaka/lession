var fs = require('fs-extra');
var Q = require("q");
var mongoose = require('mongoose');
var common = require('../../../public/js/common');
var RobotNode = mongoose.model('RobotNode');
var strHelp = common.strHelp;

var fileHelper = {};

var getFileContent = function (node,cb) {
    if (node.fileType == "dir") {

    } else if (node.fileType == "file") {
        var content = "";

        var insertFileSetting = function (settingName,value,comment) {
            if(strHelp.isNotEmptyStr(value) || strHelp.isNotEmptyStr(comment) ){
                var settingHeader = settingName;
                settingHeader = common.strHelp.fill(settingHeader,14," ");
                content += settingHeader;
                if(strHelp.isNotEmptyStr(value)){
                    content += "    " + value;
                }
                if(strHelp.isNotEmptyStr(comment)){
                    content += "    " + "# " + comment;
                }
                content += "\r\n";
            }
        };

        //设置信息
        content += "*** Settings ***\r\n";
        insertFileSetting("Documentation",node.documentation);
        insertFileSetting("Suite Setup",node.suiteSetup.value,node.suiteSetup.comment);
        insertFileSetting("Suite Teardown",node.suiteTeardown.value,node.suiteTeardown.comment);
        insertFileSetting("Test Setup",node.testSetup.value,node.testSetup.comment);
        insertFileSetting("Test Teardown",node.testTeardown.value,node.testTeardown.comment);

        var tempTagsStr = "";
        var dealTags = function (tag,index) {
            if(index == 0){
                tempTagsStr += tag.text;
            }else{
                tempTagsStr += "    " + tag.text;
            }
        };
        node.forceTags.forEach(dealTags);
        insertFileSetting("Force Tags",tempTagsStr);

        tempTagsStr = "";
        node.defaultTags.forEach(dealTags);
        insertFileSetting("Default Tags",tempTagsStr);

        insertFileSetting("Test Template",node.testTemplate.value,node.testTemplate.comment);
        insertFileSetting("Test Timeout",node.testTimeout.value,node.testTimeout.comment);

        node.imports.forEach(function (mImport) {
            insertFileSetting( mImport.type,mImport.path,mImport.comment);
        });
        content += "\r\n";


        // 变量信息
        if(node.variables.length > 0){
            content += "*** Variables ***\r\n";
            node.variables.forEach(function (variable) {
                if(variable.type == "Scalar"){
                    content += common.strHelp.fill(variable.name,14," ");
                    if( !strHelp.isNotEmptyStr(variable.stringValue) && !strHelp.isNotEmptyStr(variable.comment) ) {
                        content += "    ${EMPTY}\r\n"
                    }else{
                        if(strHelp.isNotEmptyStr(variable.stringValue)){
                            content += "    " + variable.stringValue;
                        }else{
                            content += "    \\";
                        }
                        if(strHelp.isNotEmptyStr(variable.comment)){
                            content += "    " + "# " + variable.comment;
                        }
                        content += "\r\n";
                    }
                }
                if(variable.type == "List" || variable.type == "Dict"){
                    content += common.strHelp.fill(variable.name,14," ");
                    var mIndex = 0;
                    variable.arrayValue.forEach(function (value,index) {
                        mIndex = index;
                        if(index % 7 == 0 && index != 0){
                            content += "\r\n";
                            content += common.strHelp.fill("...", 14, " ");
                        }
                        if(value.text.length == 0  ){
                            if((index + 1) % 7 == 0){
                                content += "    ${EMPTY}";
                            }else{
                                content += "    \\";
                            }
                        }else {
                            content += "    "+value.text;
                        }
                    });

                    if(strHelp.isNotEmptyStr(variable.comment)){
                        if( (mIndex + 1) % 7 == 0 && mIndex != 0){
                            content += common.strHelp.fill("\r\n...",14," ");
                        }
                        content += "    " + "# " + variable.comment;
                    }
                    content += "\r\n";
                }
            });
            content += "\r\n";
        }

        //children 信息
        node.children(function (err,children) {
            if(err){
                console.log(err);
                return;
            }

            var insertValueComment = function (title,value,comment) {
                if(strHelp.isNotEmptyStr(value) || strHelp.isNotEmptyStr(comment) ){
                    content += "    [" + title + "]";
                    if(strHelp.isNotEmptyStr(value)){
                        content += "    " + value;
                    }
                    if(strHelp.isNotEmptyStr(comment)){
                        content += "    " + "# " + comment;
                    }
                    content += "\r\n";
                }
            };


            //用例信息
            content += "*** Test Cases ***\r\n";
            children.forEach(function (child) {
                if (child.type == "case") {
                    content += child.name + "\r\n";
                    if (strHelp.isNotEmptyStr(child.documentation)) {
                        content += "    [Documentation]    " + child.documentation + "\r\n";
                    }

                    tempTagsStr = "";
                    child.tags.forEach(dealTags);
                    insertValueComment("Tags", tempTagsStr);

                    insertValueComment("Setup", child.setup.value, child.setup.comment);
                    insertValueComment("Template", child.template.value, child.template.comment);
                    insertValueComment("Timeout", child.timeout.value, child.timeout.comment);

                    if (child.form) {
                        child.form.rows.forEach(function (row) {
                            row.cells.forEach(function (cell) {
                                content += "    " + cell.text;
                            });
                            content += "\r\n";
                        });
                    }
                    insertValueComment("Teardown", child.teardown.value, child.teardown.comment);
                    content += "\r\n";
                }
            });


            //用户关键字信息
            content += "*** Keywords ***\r\n";
            children.forEach(function (child) {
                if (child.type == "keyword") {
                    content += child.name + "\r\n";
                    insertValueComment("Arguments", child.arguments.value, child.arguments.comment);
                    if (strHelp.isNotEmptyStr(child.documentation)) {
                        content += "    [Documentation]    " + child.documentation + "\r\n";
                    }

                    tempTagsStr = "";
                    child.tags.forEach(dealTags);
                    insertValueComment("Tags", tempTagsStr);

                    insertValueComment("Timeout", child.timeout.value, child.timeout.comment);

                    if (child.form) {
                        child.form.rows.forEach(function (row) {
                            row.cells.forEach(function (cell) {
                                content += "    " + cell.text;
                            });
                            content += "\r\n";
                        });
                    }
                    insertValueComment("Teardown", child.teardown.value, child.teardown.comment);
                    insertValueComment("Return", child.returnValue.value, child.returnValue.comment);
                    content += "\r\n";
                }
            });


            cb(content);
        });
    }
};

//生成文件代码
fileHelper.createProjectFiles = function (pNode,projectPath,cb) {
    var removeOldFiles = function () {
        var deferred = Q.defer();
        fs.remove(projectPath, function (err) {
            if (err) {
                console.log(err);
                return;
            }
            deferred.resolve();
        });
        return deferred.promise;
    };
    var createRootDir = function () {
        var deferred = Q.defer();
        fs.mkdir(projectPath, 0666, function (err) {
            if (err) {
                console.log(err);
                return;
            }
            var data = {
                path:projectPath,
                node:pNode
            };
            deferred.resolve(data);
        });
        return deferred.promise;
    };

    var createProject = function (data) {
        var deferred = Q.defer();
        var path = data.path + "/" +  data.node.name;
        fs.mkdir(path, 0666, function (err) {
            if (err) {
                console.log(err);
                return;
            }
            console.log(path);
            var initFileFullName = path + '/__init__.txt';
            fs.writeFile(initFileFullName, "", {flag: 'w'}, function (err) {
                if(err) {
                    console.error(err);
                } else {
                    console.log(initFileFullName);
                }
                data.node.children(function (err,children) {
                    var nData = {
                        path: path,
                        nodes:children
                    };
                    deferred.resolve(nData);
                });
            });
        });
        return deferred.promise;
    };

    var dealDir = function (data,child,cb) {
        //创建目录
        var path = data.path + "/" + child.name;
        fs.mkdir(path, 0666, function (err) {
            if (err) {
                console.log(err);
                return;
            }
            //创建__init__文件
            var initFileFullName = path + '/__init__.txt';
            fs.writeFile(initFileFullName, "", {flag: 'w'}, function (err) {
                if(err) {
                    console.error(err);
                } else {
                    //获取子元素
                    child.children(function (err,children) {
                        var nData = {
                            path: path,
                            nodes:children
                        };
                        walk(nData)
                            .then(cb);
                    });
                }
            });
        });
    };

    var walk = function (data) {
        console.log("walk");
        var deferred = Q.defer();
        var len = data.nodes.length;
        if(len == 0){
            deferred.resolve();
        }
        data.nodes.forEach(function (child) {
            if(child.fileType == "dir"){
                dealDir(data,child,function () {
                    len --;
                    if(len == 0){
                        deferred.resolve();
                    }
                });
            }else if(child.fileType == "file"){
                var fileFullName = data.path + '/' + child.name + '.txt';
                getFileContent(child,function (content) {
                    fs.writeFile(fileFullName, content , {flag: 'w'}, function (err) {
                        if (err) {
                            console.error(err);
                        } else {
                            len --;
                            if(len == 0){
                                deferred.resolve();
                            }
                        }
                    });
                });
            }else{
                len --;
                if(len == 0){
                    deferred.resolve();
                }
            }
        });
        return deferred.promise;
    };

    removeOldFiles()
        .then(createRootDir)
        .then(createProject)
        .then(walk)
        .then(cb);
};


module.exports = fileHelper;