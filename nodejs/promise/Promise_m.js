var Promise = function (fn) {

    var self = this;

    self.state = "Pending"; // Resolved Rejected
    self.resolve = function (data) {
        if(self.state == "Pending") {
            self.data = data;
            self.fulfilleds.forEach(function (func) {
                func(self.data);
                console.log("fulfilled1:"+data);
            });
            self.state = "Resolved";
        }
    };
    self.reject = function (data) {
        if(self.state == "Pending") {
            self.data = data;
            self.rejecteds.forEach(function (func) {
                func(self.data);
            });
            self.state = "Rejected";
        }

    };

    self.fulfilleds = [];
    self.rejecteds = [];

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
                });
            }else {
                resolve(p1);
            }

        };

        var error = function (data) {

        };
        self.fulfilleds.push(success);
        self.rejecteds.push(error);
        if(self.state == "Resolved"){
            success(self.data);
        }

        if(self.state == "Rejected"){
            error(self.data);
        }
    });
    // if(self.state == "Pending"){
    //     fulfilled && self.fulfilleds.push(fulfilled);
    //     rejected && self.rejecteds.push(rejected);
    // }else if(self.state == "Resolved"){
    //     var p1 = fulfilled(self.data);
    //     console.log("fulfilled2:"+self.data);
    // }else if(self.state == "Rejected"){
    //     var p2 = rejected(self.data);
    // }

    return p;
};

module.exports = Promise;