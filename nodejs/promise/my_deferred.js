// var Q = require("q");



function Q() {
    Q.defer = function () {
        var deferred = {};
        deferred.promise = {};

        deferred.promise.then = function (success,error) {
            deferred.resolve = function () {
                success(arguments);
            };
            deferred.reject = function () {
                error(arguments);
            };
        };

        return deferred;
    }
}




var fun1 = function (data) {
    var deferred = Q.defer();
    deferred.resolve(data+" fun1");
    return deferred.promise;
};

var fun2 = function (data) {
    var deferred = Q.defer();
    deferred.resolve(data+" fun2","data2");
    return deferred.promise;
};

var fun3 = function (data,data2) {
    var deferred = Q.defer();
    for(var i=0;i<3;i++){
        deferred.resolve(data + " fun3 " + i);
    }
    return deferred.promise;
};

function main(data,cb){
    fun1("test")
        .then(fun2)
        .then(fun3)
        .done(function(data){
            cb(null,data);//ok 获得的最终数据为 --->"test fun1 fun2 fun3"
        },function(err){
            cb(err);//failed
        });
}

main("haha",function (err,data) {
    console.log(data);
});