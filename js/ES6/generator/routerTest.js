var Router = require("./Router");
var router = new Router();
router.use(function (req,res) {
    req.a = 1;
    console.log(req);
},[function (req,res,next) {
    req.b = 2;
    console.log(req);
    next();
},function (req,res) {
    req.c = 3;
    console.log(req);
}]);
router.use(function (req,res) {
    req.d = 4;
    console.log(req);
    throw "测试错误";
});
router.use(function (err,req,res,next) {
    req.e = 5;
    console.log(req);
    next();
},function (req,res) {
    req.f = 6;
    console.log(req);
});
router.use(function (err,req,res,next) {
    req.g = 7;
    console.log(req);
});
router.run();