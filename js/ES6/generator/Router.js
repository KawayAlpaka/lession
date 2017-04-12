var Router = function() {
    this.funcs = [];
};
Router.prototype.use  = function (func) {
    this.funcs.push(func);
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
