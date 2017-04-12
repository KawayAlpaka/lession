var Router = function() {
    arguments
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
        for(var i in self.funcs){
            yield setTimeout(function () {
                switch (self.funcs[i].length){
                    case 3:
                        self.funcs[i](self.req,self.res,next);
                        break;
                    default:
                        self.funcs[i](self.req,self.res);
                        next();
                        break;
                }
            },1);
        }
    };
    var g = G();
    var next = function () {
        g.next();
    };
    next();
};
module.exports = Router;
