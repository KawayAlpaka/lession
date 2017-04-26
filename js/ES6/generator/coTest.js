var co = require('co');
var getInfo = function (data) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(data + 1);
        },1000)
    });
};
co(function* () {
    var r1 = yield getInfo(0);
    console.log(r1);
    var r2 = yield getInfo(r1);
    console.log(r2);
    return getInfo(r2);
}).then(function (data) {
    console.log(data);
});