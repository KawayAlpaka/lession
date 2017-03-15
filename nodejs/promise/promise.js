var Promise = require("./Promise_m");
console.log("A");
var p1 =  new Promise(function (resolve,reject) {
    console.log("a");
    return resolve(1);
});

console.log("B");
var p2 = p1.then(function (data) {
    console.log("b");
    console.log(data);
    var p = new Promise(function (resolve,reject) {
        // console.log("b2");
        resolve(data + 1);
    });
    // console.log("b3");
    return p;
});
console.log("C");

p2.then(function (data) {
    console.log("c");
    console.log(data);
    return new Promise(function (resolve,reject) {
        resolve(data + 1);
    });
});
console.log("D");
p1.then(function (data) {
    console.log("d");
    console.log(data);
    return new Promise(function (resolve,reject) {
        resolve(data + 1);
    });
});
console.log("E");