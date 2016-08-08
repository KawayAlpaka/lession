// var Q = require("q");



function Q() {
}
Q.defer = function () {
    var deferred = {};
    deferred.promise = {};
    deferred.promise.list = [];

    deferred.promise.then = function (success,error) {
        // console.log("then:");
        // console.log(success);
        // console.log(error);
        deferred.success = success;
        deferred.error = error;

        deferred.promise.list.push({
            success:success,
            error:error
        });

        return deferred.promise;
    };

    deferred.promise.done = function (success,error) {
        // console.log("done:");
        // console.log(success);
        // console.log(error);
        deferred.success = success;
        deferred.error = error;

        deferred.promise.list.push({
            success:success,
            error:error
        });

        return deferred.promise;
    };

    deferred.resolve = function () {
        var _arguments = arguments;

        var _argumentList = [];
        for(var i=0;i<_arguments.length;i++ ){
            _argumentList.push(_arguments[0]);
        }
        setTimeout(function () {

            if(deferred.promise.list.length > 0){
                // var promise = deferred.promise.list[0].success(_arguments);
                var promise = deferred.promise.list[0].success.apply(null, _argumentList);
                deferred.promise.list.splice(0,1);
                if(promise){
                    promise.list = deferred.promise.list;
                }
            }

        },1);
        // }, parseInt(5000 * Math.random() ) );
    };
    deferred.reject = function () {
        var _arguments = arguments;

        var _argumentList = [];
        for(var i=0;i<_arguments.length;i++ ){
            _argumentList.push(_arguments[0]);
        }
        setTimeout(function () {

            if(deferred.promise.list.length > 0){
                // var promise = deferred.promise.list[0].success(_arguments);
                var promise = deferred.promise.list[0].error.apply(null, _argumentList);
                deferred.promise.list.splice(0,1);
                if(promise){
                    promise.list = deferred.promise.list;
                }
            }
        },1);
        // },parseInt(5000 * Math.random() ));
    };

    return deferred;
};


var fun1 = function (data) {
    console.log("fun1");
    var deferred = Q.defer();
    // deferred.resolve(data+" fun1");
    deferred.reject(data+" fun1 reject");
    // console.log(deferred.promise.then.toString());
    return deferred.promise;
};


var fun2 = function (data) {
    console.log("fun2");
    var deferred = Q.defer();
    deferred.resolve(data+" fun2","data2");
    return deferred.promise;
};
var fun22 = function (data) {
    console.log("fun22");
    var deferred = Q.defer();
    deferred.resolve(data+" fun22","data2");
    return deferred.promise;
};

var fun3 = function (data,data2) {
    console.log("fun3");
    var deferred = Q.defer();
    for(var i=0;i<3;i++){
        deferred.resolve(data + " fun3 " + i);
    }
    return deferred.promise;
};
var fun32 = function (data,data2) {
    console.log("fun32");
    var deferred = Q.defer();
    for(var i=0;i<3;i++){
        deferred.resolve(data + " fun32 " + i);
    }
    return deferred.promise;
};

function main(data,cb){
    var temp = fun1("test")
        .then(fun2,fun22)
        .then(fun3,fun32)
        .done(function(data){
            cb(null,data);//ok 获得的最终数据为 --->"test fun1 fun2 fun3"
        },function(err){
            cb(err);//failed
        });
    console.log(temp);
}

main("haha",function (err,data) {
    console.log(data);
});