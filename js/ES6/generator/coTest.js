var co = require('co');
var getInfo = function (data) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            var random = Math.random();
            if(random<0.5){
                resolve(data + 1);
            }else {
                reject(data +":"+random);
            }

        },1000)
    });
};
co(function* () {
    while (true){
        try {
            var r1 = yield getInfo(0);
            console.log(r1);
            var r2 = yield getInfo(r1);
            console.log(r2);
        }catch (e){
            console.log(e);
        }

    }
    return getInfo(r2);
}).then(function (data) {
    console.log(data);
});