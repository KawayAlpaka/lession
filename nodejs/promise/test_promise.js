if (typeof module != "undefined") {
    // var Promise = require("./Promise_m");
}
var Promise = require("./Promise_m");
// 测试then
console.log("A:");
var p1 = new Promise(function (resolve, reject) {
    console.log("a");
    return resolve(1);
}, function (data) {

});

console.log("B:");
var p2 = p1.then(function (data) {
    console.log("b");
    console.log(data);
    var p = new Promise(function (resolve, reject) {
        resolve(data + 1);
    });
    return p;
});
console.log("C:");

p2.then(function (data) {
    console.log("c");
    console.log(data);
    return new Promise(function (resolve, reject) {
        resolve(data + 1);
    });
});
console.log("D:");
p1.then(function (data) {
    console.log("d");
    console.log(data);
    return new Promise(function (resolve, reject) {
        resolve(data + 1);
    });
});
console.log("E:");



//测试 then 的第二个参数
// Error会被抛出的它的promise之后的第一个带有catch的promise捕获到
var pc1 = new Promise(function (resolve, reject) {
    console.log("pc1");
    throw new Error('pc1 throw');
    return resolve("pc1 resolve");
});

var pc2 = pc1.then(function (data) {
    console.log("pc1 success 1");
    console.log(data);
});

pc2.then(function (data) {
    console.log("pc2 success 1");
    console.log(data);
}, function (err) {
    console.log("pc2 error 1");
    console.log(err.toString());
});

pc1.then(function (data) {
    console.log("pc1 success 2");
    console.log(data);
});

//测试 catch
var pc1 = new Promise(function (resolve, reject) {
    console.log("pc1");
    // throw new Error('pc1 throw');
    reject('pc1 reject');
    resolve("pc1 resolve");
});
var pc2 = pc1.catch(function (err) {
    console.log("pc1 catch 1");
    console.log(err.toString());
    throw new Error('pc1 catch throw');
});
pc2.catch(function (err) {
    console.log("pc2 catch 1");
    console.log(err.toString());
});
pc1.catch(function (err) {
    console.log("pc1 catch 2");
    console.log(err.toString());
    // throw new Error('pc1 catch throw');
});

// 测试 all
Promise.all([new Promise(function (resolve, reject) {
    setTimeout(() => resolve(1), 3000);
}), new Promise(function (resolve, reject) {
    setTimeout(() => resolve(2), 1000);
    // }),new Promise(function (resolve,reject) {
    //     setTimeout(() => {throw new Error('Promise.all throw 3')},5000);//异步中的异常还是无法被catch捕获
    // }),new Promise(function (resolve,reject) {
    //     setTimeout(() => reject(new Error('4')) ,5000);
})]).then(function (data) {
    console.log(data)
}, function (err) {
    console.log(err.message)
});

// 测试 race
Promise.race([new Promise(function (resolve, reject) {
    setTimeout(() => resolve(1), 3000);
}), new Promise(function (resolve, reject) {
    setTimeout(() => resolve(2), 1000);
    // }),new Promise(function (resolve,reject) {
    //     setTimeout(() => {throw new Error('Promise.all throw 3')},5000);//异步中的异常还是无法被catch捕获
}), new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error('4')), 5000);
})]).then(function (data) {
    console.log(data)
}, function (err) {
    console.log(err.message)
});

// 测试运行顺序  结论：正常运行的比较快
(function(){
    let resolved = Promise.resolve();
    let rejected = Promise.reject();
    setTimeout(function(){
        resolved.then(function(){
            console.log("已经resolve的promise运行then");
        });
        rejected.catch(function(){
            console.log("已经reject的promise运行catch");
        });
        console.log("正常log");
    },100);
})();


// _temp code
new Promise(function (resolve, reject) {
    resolve(1);
}).then(function (data) {
    console.log(data);
}).then(function (data) {
    console.log(data);
});

var _p = new Promise(function (resolve, reject) {
    reject(1);
});
_p.then(function (data) {
    console.log("success 1");
    console.log(data);
}, function (err) {
    console.log("error 1");
    console.log(err);
}).then(function (data) {
    console.log("success 2");
    console.log(data);
}, function (err) {
    console.log("error 2");
    console.log(err);
});