var p1 =  new Promise(function (resolve,reject) {
    console.log("a");
    return resolve(1);
});

p1.then(function (data) {
    console.log("b");
    console.log(data);
    return new Promise(function (resolve,reject) {
        resolve(data + 1);
    });
}).then(function (data) {
    console.log("c");
    console.log(data);
    return new Promise(function (resolve,reject) {
        resolve(data + 1);
    });
});

p1.then(function (data) {
    console.log("d");
    console.log(data);
    return new Promise(function (resolve,reject) {
        resolve(data + 1);
    });
});