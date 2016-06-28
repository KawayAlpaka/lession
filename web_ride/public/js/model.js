define(['app','./model/robot_node'], function(myApp,robot_node){
        myApp.factory('model',['api','$q',function(api,$q){
            var promise = function(myFunc){
                var promise;
                promise = $q(myFunc);
                promise.success = function (fn) {
                    promise.then(fn);
                    return promise;
                };
                promise.error = function (fn) {
                    return promise["catch"](fn);
                };
                return promise;
            };

            var C = {};
            C.promise = promise;
            C.api = api;

            return {
                RobotNode:robot_node.init(C)
            };
        }]);
    }
);