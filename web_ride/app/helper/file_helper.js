var fs = require('fs-extra');
var Q = require("q");
var mongoose = require('mongoose');
var common = require('../../public/js/common');
var _ = require('underscore');
var RobotNode = mongoose.model('RobotNode');
var Inflector = require('inflected');
var extend = require('util')._extend;
var strHelp = common.strHelp;

var fileHelper = {};

var getFileContent = function (node,debugOptions,cb) {
    if (node.fileType == "dir") {

    } else if (node.fileType == "file") {

        var addParamOptions = [];
        if (debugOptions != null) {
            addParamOptions = _.filter(debugOptions, function (option) {
                return option.way == "add param after keyword";
            });
        }

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
            if(node.type == "suite"){
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

                        // debugOptions
                        // addParamOptions
                        if (child.form) {
                            child.form.rows.forEach(function (row) {
                                row.cells.forEach(function (cell) {
                                    content += "    " + cell.text;
                                });

                                // 添加调试 参数
                                if(row.cells.length > 0){
                                    var matchOptions = _.filter(addParamOptions,function (option) {
                                        return option.params.keyword == row.cells[0].text;
                                    });
                                    matchOptions.forEach(function (option) {
                                        content += "    " + option.params.param;
                                    });
                                }

                                content += "\r\n";
                            });
                        }
                        insertValueComment("Teardown", child.teardown.value, child.teardown.comment);
                        content += "\r\n";
                    }
                });
            }

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
fileHelper.createProjectFiles = function (pNode,projectPath,debugOptions,cb) {
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
                console.log(fileFullName);
                getFileContent(child,debugOptions,function (content) {
                    console.log("content:");
                    console.log(content);
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




// 项目导入部分
fileHelper.readLines = function (path,cb) {
    input = fs.createReadStream(path);
    var remaining = '';
    var array = [];
    input.on('data', function(data) {
        remaining += data;
        var index = remaining.indexOf('\n');
        while (index > -1) {
            var line = remaining.substring(0, index);
            remaining = remaining.substring(index + 1);
            index = remaining.indexOf('\n');
            line = line.replace("\r","");
            line = line.replace("\n","");
            array.push(line);
        }
    });

    input.on('end', function() {
        if (cb) {
            cb(array,remaining);
        }
    });
};


// 处理 Variables
var dealVariables = function (fileNode,lineStr) {
    if(lineStr.trim().length == 0){
        // 空字符串基本就是结束标记，不处理
    }else{
        var strArr = lineStr.split("    ");
        for(var tempIndex in strArr ){
            strArr[tempIndex] = strArr[tempIndex].trim();
        }
        strArr = _.filter(strArr,function (str) {
            return str.trim().length > 0;
        });
    }
};

// 处理Settings
var dealSettings = function (fileNode,lineStr) {
    if(lineStr.trim().length == 0){
        // 空字符串基本就是结束标记，不处理
    }else{
        var strArr = lineStr.split("    ");
        for(var tempIndex in strArr ){
            strArr[tempIndex] = strArr[tempIndex].trim();
        }
        strArr = _.filter(strArr,function (str) {
            return str.trim().length > 0;
        });
        switch (strArr[0].trim()) {
            case "Documentation":
                fileNode.documentation = strArr[1];
                break;
            case "Force Tags":
                strArr.splice(0,1);
                strArr.forEach(function (tag) {
                    fileNode.forceTags.push({
                        text:tag
                    });
                });
                break;
            case "Default Tags":
                strArr.splice(0,1);
                strArr.forEach(function (tag) {
                    fileNode.defaultTags.push({
                        text:tag
                    });
                });
                break;
            case "Library":
                strArr.splice(0,1);
                var getLibrary = function (arr) {
                    switch (arr.length) {
                        case 5:
                            return {
                                type:"Library",
                                path:arr[0],
                                args:arr[1],
                                alias:arr[3],
                                comment:arr[4].replace("# ","")
                            };
                            break;
                        case 4:
                            var tempObj =                                                                             {
                                type:"Library"
                            };
                            for(var tempIndex in arr){
                                if(tempIndex == 0){
                                    tempObj.path = arr[tempIndex];
                                }else{
                                    if(arr[tempIndex][0] == "#" && tempIndex == arr.length-1){
                                        tempObj.comment = arr[tempIndex].replace("# ","");
                                    }
                                    if(arr[tempIndex] == "WITH NAME"){
                                        tempObj.alias = arr[tempIndex + 1];
                                    }
                                    if(arr[tempIndex] != "WITH NAME" && tempIndex == 1 && arr[tempIndex][0] != "#"){
                                        tempObj.args = arr[tempIndex];
                                    }
                                }
                            }
                            return tempObj;
                            break;
                        // 还需要补充
                        case 2:
                            var tempObj =                                                                             {
                                type:"Library"
                            };
                            for(var tempIndex in arr){
                                if(tempIndex == 0){
                                    tempObj.path = arr[tempIndex];
                                }else{
                                    if(arr[tempIndex][0] == "#" && tempIndex == arr.length-1){
                                        tempObj.comment = arr[tempIndex].replace("# ","");
                                    }
                                    if(arr[tempIndex] == "WITH NAME"){
                                        tempObj.alias = arr[tempIndex + 1];
                                    }
                                    if(arr[tempIndex] != "WITH NAME" && tempIndex == 1 && arr[tempIndex][0] != "#"){
                                        tempObj.args = arr[tempIndex];
                                    }
                                }
                            }
                            return tempObj;
                            break;
                        case 1:
                            return {
                                type:"Library",
                                path:arr[0]
                            };
                            break;
                        default:
                            return {};
                            break;
                    }
                };
                // console.log(getLibrary(strArr));
                // console.log(strArr);
                fileNode.imports.push( getLibrary(strArr) );
                break;
            case "Resource":
                strArr.splice(0,1);
                var getResource = function (arr) {
                    var tempObj = {
                        type:"Resource"
                    };
                    if(arr.length == 2){
                        tempObj.path = arr[0];
                        tempObj.comment = arr[1].replace("# ","");
                    }
                    if(arr.length == 1){
                        if(arr[0][0] == "#"){
                            tempObj.comment = arr[0].replace("# ","");
                        }else{
                            tempObj.path = arr[0];
                        }
                    }
                    return tempObj;
                };
                fileNode.imports.push( getResource(strArr) );
                break;
            case "Variables":
                strArr.splice(0,1);
                var getVariables = function (arr) {
                    var tempObj = {
                        type:"Variables"
                    };
                    if(arr.length == 3){
                        tempObj.path = arr[0];
                        tempObj.args = arr[1];
                        tempObj.comment = arr[2].replace("# ","");
                    }
                    if(arr.length == 2){
                        tempObj.path = arr[0];
                        if(arr[1][0] == "#"){
                            tempObj.comment = arr[1].replace("# ","");
                        }else{
                            tempObj.args = arr[1];
                        }
                    }
                    if(arr.length == 1){
                        tempObj.path = arr[0];
                    }
                    return tempObj;
                };
                fileNode.imports.push( getVariables(strArr) );
                break;
            default:
                var tempKey = Inflector.camelize(strArr[0].trim(), false).replace(" ","");
                var  getValueComment = function (arr) {
                    // console.log(arr);
                    if(arr.length > 1){
                        return {
                            value:arr[0].trim(),
                            comment:arr[1].trim().replace("# ","")
                        };
                    }else if(arr.length = 1){
                        if(arr[0].trim()[0] == "#"){
                            return{
                                comment:arr[0].trim().replace("# ","")
                            };
                        }else {
                            return{
                                value:arr[0].trim()
                            };
                        }
                    }else {
                        return {};
                    }
                };
                strArr.splice(0,1);
                fileNode[tempKey] = getValueComment(strArr);
                break;
        }
    }
};



var walkDir =  function(path,node) {
    console.log("walkDir");
    var deferred = Q.defer();

    var arrTemp = path.split("/");
    node.name = arrTemp[arrTemp.length-1];
    node.children = [];

    fs.readdir(path, function(err, files) {
        if (err) {
            console.log('read dir error');
            deferred.resolve();
        } else {
            var len = files.length;
            var willResolve = function () {
                if(len <= 0){
                    deferred.resolve(node);
                }
            };
            willResolve();
            files.forEach(function(item) {
                var tmpPath = path + '/' + item;
                fs.stat(tmpPath, function(err1, stats) {
                    if (err1) {
                        console.log('stat error');
                    } else {
                        if (stats.isDirectory()) {
                            var dirNode = new RobotNode({fileType:"dir",type:"other",fileFormat:"txt",parent:node._id});
                            node.children.push(dirNode);
                            walkDir(tmpPath,dirNode)
                                .then(function () {
                                    len -- ;
                                    willResolve();
                                });
                        } else {
                            if(item == "__init__.txt"){
                                //处理初始化文件
                                len -- ;
                                willResolve();
                            }else{
                                //处理文件
                                // var fileNode = new RobotNode({name:item,type:"suite",fileType:"file",fileFormat:"txt",parent:node._id});
                                // fileNode.children = [];
                                // node.children.push(fileNode);
                                fileHelper.readLines(tmpPath,function (arr) {
                                    var fileNode;

                                    // 判断是套件还是资源
                                    if(_.contains(arr,"*** Test Cases ***")){
                                        fileNode = new RobotNode({name:item,type:"suite",fileType:"file",fileFormat:"txt",parent:node._id});
                                    }else{
                                        fileNode = new RobotNode({name:item,type:"resource",fileType:"file",fileFormat:"txt",parent:node._id});
                                    }

                                    fileNode.children = [];
                                    node.children.push(fileNode);

                                    //开始逐行解析文件
                                    var typeFlag = "";
                                    var preVariables;
                                    var currentNode = {};

                                    var dealCase = function (lineStr,nodeType,rObj) {
                                        if(lineStr.trim().length == 0){
                                            // 空字符串基本就是结束标记，不处理
                                        }else{
                                            var strArr = lineStr.split("    ");
                                            for(var tempIndex in strArr ){
                                                strArr[tempIndex] = strArr[tempIndex].trim();
                                            }
                                            // console.log(strArr);
                                            if(strArr[0].trim().length != 0){
                                                // console.log(strArr);
                                                rObj[nodeType] = new RobotNode({name:strArr[0].trim(),type:nodeType,fileType:"content",parent:fileNode._id});
                                                rObj[nodeType].children = [];
                                                fileNode.children.push(rObj[nodeType]);
                                                // rObj[nodeType].form.rows = new Array();
                                                rObj[nodeType].form = extend({},{rows:[]},true);  //解决一个匪夷所思的问题，后续有待研究
                                            }else {
                                                strArr.splice(0,1);
                                                var  getValueComment = function (arr) {
                                                    if(arr.length > 1){
                                                        return {
                                                            value:arr[0].trim(),
                                                            comment:arr[1].trim().replace("# ","")
                                                        };
                                                    }else if(arr.length = 1){
                                                        if(arr[0].trim()[0] == "#"){
                                                            return{
                                                                comment:arr[0].trim().replace("# ","")
                                                            };
                                                        }else {
                                                            return{
                                                                value:arr[0].trim()
                                                            };
                                                        }
                                                    }else {
                                                        return {};
                                                    }
                                                };
                                                switch (strArr[0]){
                                                    case "[Documentation]":
                                                        rObj[nodeType].documentation = strArr[1];
                                                        break;
                                                    case "[Tags]":
                                                        strArr.splice(0,1);
                                                        strArr.forEach(function (str) {
                                                            rObj[nodeType].tags.push({
                                                                text:str
                                                            });
                                                        });
                                                        break;
                                                    case "[Setup]":
                                                        strArr.splice(0,1);
                                                        rObj[nodeType]["setup"] = getValueComment(strArr);
                                                        break;
                                                    case "[Template]":
                                                        strArr.splice(0,1);
                                                        rObj[nodeType]["template"] = getValueComment(strArr);
                                                        break;
                                                    case "[Timeout]":
                                                        strArr.splice(0,1);
                                                        rObj[nodeType]["timeout"] = getValueComment(strArr);
                                                        break;
                                                    case "[Teardown]":
                                                        strArr.splice(0,1);
                                                        rObj[nodeType]["teardown"] = getValueComment(strArr);
                                                        break;
                                                    case "[Return]":
                                                        strArr.splice(0,1);
                                                        rObj[nodeType]["returnValue"] = getValueComment(strArr);
                                                        break;
                                                    default:
                                                        var cells = [];
                                                        strArr.forEach(function (str) {
                                                            cells.push({
                                                                text:str
                                                            })
                                                        });
                                                        rObj[nodeType].form.rows.push({
                                                            cells:cells
                                                        });
                                                        break;
                                                }
                                            }
                                        }
                                    };
                                    arr.forEach(function (lineStr) {
                                        switch (lineStr) {
                                            case "*** Settings ***":
                                                typeFlag = "Settings";
                                                break;
                                            case "*** Variables ***":
                                                typeFlag = "Variables";
                                                break;
                                            case "*** Test Cases ***":
                                                typeFlag = "Test Cases";
                                                break;
                                            case "*** Keywords ***":
                                                typeFlag = "Keywords";
                                                break;
                                            default:
                                                switch (typeFlag) {
                                                    case "Settings":
                                                        dealSettings(fileNode,lineStr);
                                                        break;
                                                    case "Variables":
                                                        if(lineStr.trim().length == 0){
                                                            // 空字符串基本就是结束标记，不处理
                                                        }else{
                                                            var strArr = lineStr.split("    ");
                                                            for(var tempIndex in strArr ){
                                                                strArr[tempIndex] = strArr[tempIndex].trim();
                                                            }
                                                            strArr = _.filter(strArr,function (str) {
                                                                return str.trim().length > 0;
                                                            });
                                                            switch (strArr[0][0]){
                                                                case "$":
                                                                    var tempObj = {
                                                                        type:"Scalar",
                                                                        name:strArr[0],
                                                                        comment:strArr[2]
                                                                    };
                                                                    if(strArr[1] == "\\"){
                                                                        tempObj.stringValue = "";
                                                                    }else {
                                                                        tempObj.stringValue = strArr[1];
                                                                    }
                                                                    fileNode.variables.push(tempObj);
                                                                    preVariables = tempObj;
                                                                    break;
                                                                case "@":
                                                                    var tempObj = {
                                                                        type:"List",
                                                                        name:strArr[0],
                                                                        arrayValue:[]
                                                                    };
                                                                    strArr.splice(0,1);
                                                                    strArr.forEach(function (str) {
                                                                        tempObj.arrayValue.push({
                                                                            text:str
                                                                        });
                                                                    });
                                                                    fileNode.variables.push(tempObj);
                                                                    preVariables = tempObj;
                                                                    break;
                                                                case "&":
                                                                    var tempObj = {
                                                                        type:"Dict",
                                                                        name:strArr[0],
                                                                        arrayValue:[]
                                                                    };
                                                                    strArr.splice(0,1);
                                                                    strArr.forEach(function (str) {
                                                                        tempObj.arrayValue.push({
                                                                            text:str
                                                                        });
                                                                    });
                                                                    fileNode.variables.push(tempObj);
                                                                    preVariables = tempObj;
                                                                    break;
                                                                case ".":
                                                                    strArr.splice(0,1);
                                                                    strArr.forEach(function (str) {
                                                                        if(str[0] == "#"){
                                                                            preVariables.comment = str.replace("# ","");
                                                                        }else{
                                                                            if(str == "\\"){
                                                                                preVariables.arrayValue.push({
                                                                                    text:""
                                                                                });
                                                                            }else{
                                                                                preVariables.arrayValue.push({
                                                                                    text:str
                                                                                });
                                                                            }
                                                                        }
                                                                    });
                                                                    break;
                                                                default:
                                                                    break;
                                                            }
                                                        }
                                                        break;
                                                    case "Test Cases":
                                                        dealCase(lineStr,"case",currentNode);
                                                        break;
                                                    case "Keywords":
                                                        dealCase(lineStr,"keyword",currentNode);
                                                        break;
                                                    default:
                                                        break;
                                                }
                                                break;
                                        }
                                    });
                                    // console.log(fileNode);
                                    // console.log(currentNode.case.form.rows.length);
                                    // console.log(currentNode.keyword.form.rows.length);
                                    // console.log(currentNode["case"]);
                                    // console.log(currentNode["keyword"]);
                                    len -- ;
                                    willResolve();
                                });
                            }

                        }
                    }
                })
            });
        }
    });


    return deferred.promise;
};

var walkNode = function (node) {
    console.log(node.name);
    console.log(node.children.length);
    console.log(node);

    var deferred = Q.defer();

    node.save(function (err) {
        var len = node.children.length;
        var willResolve = function () {
            if(len <= 0){
                deferred.resolve(node);
            }
        };
        if(err){
            console.log(err);
            deferred.resolve(node)
        }else{
            willResolve();
            node.children.forEach(function (child) {
                // console.log(child);
                walkNode(child)
                    .then(function () {
                        len --;
                        willResolve()
                    });
            });
        }
    });

    return deferred.promise;

};


fileHelper.importProject = function (path,cb) {
    var node = new RobotNode({type:"project",fileType:"dir",fileFormat:"txt"});
    walkDir(path,node)
        .then(walkNode)
        .then(function () {
            console.log("importProject finish");
            cb(node);
        });
};

module.exports = fileHelper;