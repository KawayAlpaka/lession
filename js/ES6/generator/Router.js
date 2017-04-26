var Router = function() {
    this.funcs = [];
};
Router.prototype.use  = function () {
    var self = this;
    var addFunc = function (arg) {
        if (typeof arg == "function") {
            self.funcs.push(arg);
        } else {
            throw new Error("is not function")
        }
    };
    for(var i=0;i<arguments.length;i++){
        var arg = arguments[i];
        if (arg instanceof Array) {
            arg.forEach(addFunc);
        }else{
            addFunc(arg);
        }
    }
};
Router.prototype.run = function () {
    var self = this;
    self.req = {};
    self.res = {};
    var G = function* () {
        var err = null;
        for(var i in self.funcs){

            yield setTimeout(function () {
                try {
                    if(err){
                        switch (self.funcs[i].length) {
                            case 4:
                                self.funcs[i](err,self.req, self.res, next);
                                break;
                            default:
                                next();
                                break;
                        }
                    }else {
                        switch (self.funcs[i].length) {
                            case 3:
                                self.funcs[i](self.req, self.res, next);
                                break;
                            case 2:
                                self.funcs[i](self.req, self.res);
                                next();
                                break;
                            default:
                                next();
                                break;
                        }
                    }
                } catch (e) {
                    console.log(e);
                    next();
                    err = e;
                }
            }, 1);


        }
    };
    var g = G();
    var next = function () {
        g.next();
    };
    next();
};
module.exports = Router;
