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
