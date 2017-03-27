const Pending = "Pending";
const Resolved = "Resolved";
const Rejected = "Rejected";
var Promise = function (fn) {
    var self = this;
    self.state = Pending; // Resolved Rejected
    self.resolve = function (data) {
        if(self.state == Pending) {
            self.data = data;
            self.fulfilleds.forEach(function (func) {
                self._run(func,self.data);
            });
            self.state = Resolved;
        }
    };
    self.reject = function (data) {
        if(self.state == Pending) {
            self.data = data;
            self.rejecteds.forEach(function (func) {
                self._run(func,self.data);
            });
            self.state = Rejected;
        }

    };

    self.fulfilleds = [];
    self.rejecteds = [];

    self._run = function (func,data) {
        setTimeout(function () {
            func(data);
        },1);
    };
    try {
        fn && fn(self.resolve,self.reject);
    }catch (err){
        self.reject(err);
    }


    return self;
};
Promise.prototype.then = function (fulfilled,rejected) {
    var self = this;
    var p = new Promise(function (resolve,reject) {
        var success = function (data) {
            try{
                var _p = fulfilled && fulfilled(data);
                if(Promise.isPromise(_p)){
                    _p.then(function (data) {
                        resolve(data);
                    },function () {
                        reject(data);
                    });
                }else {
                    resolve(_p);
                }
            }catch (err){
                reject(err);
            }

        };

        var error = function (data) {
            try {
                var _p = rejected && rejected(data);
                if(Promise.isPromise(_p)){
                    _p.then(function (data) {
                        resolve(data);
                    },function () {
                        reject(data);
                    });
                }else {
                    resolve(_p);
                }
            }catch (err){
                reject(err);
            }
        };
        self.fulfilleds.push(success);
        self.rejecteds.push(error);
        if(self.state == Resolved){
            self._run(success,self.data);
        }

        if(self.state == Rejected){
            self._run(error,self.data);
        }
    });
    return p;
};
Promise.prototype.catch = function (rejected) {
    return this.then(null,rejected);
};

Promise.isPromise = function (obj) {
    return obj instanceof Promise;
    // return obj && obj.then;
};

Promise.resolve = function (obj) {
    if(Promise.isPromise(obj)){
        return obj;
    }else if(obj){
        return new Promise(function (resolve) {
            resolve(obj);
        });
    }else {
        var _p = new Promise(function (resolve) {
            resolve();
        });
        return _p;
    }
};

Promise.all = function (arr) {
    var promise = new Promise(function (resolve,reject) {
        var results = [];
        var ps = [];
        for(var pIndex in arr ){
            let _p = Promise.resolve(arr[pIndex]);
            let i = parseInt(pIndex);
            _p.then(function (data) {
                results[i] = data;
                var noResolvedIndex = ps.findIndex(function (p) {
                    return p.state == Pending || p.state == Rejected;
                });
                if(noResolvedIndex < 0){
                    resolve(results);
                }
            },function (err) {
                reject(err);
            });
            ps.push(_p);
        }
    });
    return promise;
};


Promise.race = function (arr) {
    var promise = new Promise(function (resolve,reject) {
        var ps = [];
        for(var pIndex in arr ){
            let _p = Promise.resolve(arr[pIndex]);
            _p.then(function (data) {
                resolve(data);
            },function (err) {
                reject(err);
            });
            ps.push(_p);
        }
    });
    return promise;
};

module.exports = Promise;