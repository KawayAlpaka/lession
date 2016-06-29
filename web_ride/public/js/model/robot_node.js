define(['jquery'],function($) {
    var C = {};
    var obj = {
        createNew:function(){
            var model = {};
            model.C = C;

            //数据操作
            model.f = {};
            model.f.update = function(json){
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

            model.f.set = function(json){
                $.extend(model,json);
            };

            //可执行操作判断
            model.f.canNewCase = function(){
                return model.fileType == "file";
            };
            model.f.canNewSuite = function(){
                return model.fileType == "dir";
            };

            model.f.findById = function (id) {
                var func = function (resolve, reject) {
                    return model.C.api.robotNode.findById(id)
                        .success(function (data) {
                            model.f.set(data.data);
                            resolve(model);
                        })
                        .error(function (data) {
                            reject(data);
                        });
                };
                return model.C.promise(func);
            };

            model.f.getChildren = function () {
                var func = function (resolve, reject) {
                    return model.C.api.robotNode.getChildren(model._id)
                        .success(function (data) {
                            model.children = [];
                            data.data.forEach(function (json) {
                                var child = obj.createNew();
                                child.f.set(json);
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
