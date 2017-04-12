// function* helloWorldGenerator() {
//     yield 'hello';
//     yield 'world';
//     return 'ending';
// }
//
// var hw = helloWorldGenerator();
//
// console.log(hw.next());
// // { value: 'hello', done: false }
// console.log(hw.next());
// // { value: 'world', done: false }
// console.log(hw.next());
// // { value: 'ending', done: true }
// console.log(hw.next());
// // { value: undefined, done: true }

// function* test() {
//     yield (function(){
//         setTimeout(function () {
//             console.log("test1");
//             console.log(t.next());
//
//         },3000);
//     })();
//     yield (function(){
//         setTimeout(function () {
//             console.log("test2");
//             console.log(t.next());
//
//         },3000);
//     })();
//     return (function(){
//         setTimeout(function () {
//             console.log("test3");
//             console.log(t.next());
//
//         },3000);
//     })();
// }
// var t = test();
// console.log(t.next());

var Router = require("./Router");
var router = new Router();
router.use(function (req,res) {
    req.a = 1;
    console.log(req);
});
router.use(function (req,res,next) {
    req.b = 2;
    console.log(req);
    next();
});
router.use(function (req,res,next) {
    req.c = 3;
    console.log(req);
    next();
});
router.run();