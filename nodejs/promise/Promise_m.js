var Promise = function (fn) {

    var self = this;

    self.state = "Pending"; // Resolved Rejected
    self.resolve = function (data) {
        if(self.state == "Pending") {
            self.data = data;
            self.fulfilleds.forEach(function (func) {
                self._run(func,self.data);
                // func(self.data);
                // console.log("fulfilled1:"+data);
            });
            self.state = "Resolved";
        }
    };
    self.reject = function (data) {
        if(self.state == "Pending") {
            self.data = data;
            self.rejecteds.forEach(function (func) {
                self._run(func,self.data);
                // func(self.data);
            });
            self.state = "Rejected";
        }

    };

    self.fulfilleds = [];
    self.rejecteds = [];

    self._run = function (func,data) {
        setTimeout(function () {
            func(data);
        },1);
    };

    fn && fn(self.resolve,self.reject);

    return self;
};
Promise.prototype.then = function (fulfilled,rejected) {
    var self = this;
    var p = new Promise(function (resolve,reject) {
        var success = function (data) {
            var p1 = fulfilled(data);
            if(p1 && p1.then){
                p1.then(function (data) {
                    resolve(data);
                },function () {
                    reject(data);
                });
            }else {
                resolve(p1);
            }
        };

        var error = function (data) {
            var p2 = rejected(data);
            if(p2 && p2.then){
                p2.then(function (data) {
                    resolve(data);
                },function () {
                    reject(data);
                });
            }else {
                reject(p2);
            }
        };
        self.fulfilleds.push(success);
        self.rejecteds.push(error);
        if(self.state == "Resolved"){
            self._run(success,self.data);
            // success(self.data);
        }

        if(self.state == "Rejected"){
            self._run(error,self.data);
            // error(self.data);
        }
    });
    return p;
};

module.exports = Promise;