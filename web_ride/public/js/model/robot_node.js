define(['jquery'],function($) {
    var C = {};
    var obj = {
        createNew:function(){
            var model = {};
            model.C = C;

            //数据操作
            model.fn = {};
            model.fn.update = function(json){
                console.log(json);
                var func = function (resolve, reject) {
                    return model.C.api.robotNode.update(model._id,json)
                        .success(function (data) {
                            resolve(data);
                        })
                        .error(function (data) {
                            reject(data);
                        });
                };
                return model.C.promise(func);
            };

            model.fn.set = function(json){
                $.extend(model,json);
            };

            //可执行操作判断
            model.fn.canNewCase = function(){
                return model.fileType == "file";
            };
            model.fn.canNewSuite = function(){
                return model.fileType == "dir";
            };

            model.fn.findById = function (id) {
                var func = function (resolve, reject) {
                    return model.C.api.robotNode.findById(id)
                        .success(function (data) {
                            model.fn.set(data.data);
                            resolve(model);
                        })
                        .error(function (data) {
                            reject(data);
                        });
                };
                return model.C.promise(func);
            };

            model.fn.getChildren = function () {
                var func = function (resolve, reject) {
                    return model.C.api.robotNode.getChildren(model._id)
                        .success(function (data) {
                            model.children = [];
                            data.data.forEach(function (json) {
                                var child = obj.createNew();
                                child.fn.set(json);
                                model.children.push(child);
                            });
                            resolve(model);
                        })
                        .error(function (data) {
                            reject(data);
                        });
                };
                return model.C.promise(func);
            };

            return model;
        },
        init:function(common){
            C = common;
            return obj;
        }
    };
    return obj;
});