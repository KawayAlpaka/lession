//async 当前版本不支持
//
console.log("test1.js run");
var readFile = function (a) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            var random = Math.random();
            if(random<0.5){
                resolve(a);
            }else{
                reject(a +":"+random);
                // throw a +":"+random; //异步throw的异常不能被捕获
            }
        },1000)
    });
};

var asyncReadFile = async function () {
    while (true){
        try {
            var f1 = await readFile('/etc/fstab');
            console.log(f1);
            var f2 = await readFile('/etc/shells');
            console.log(f2);
        }catch (e){
            console.log(e);
        }
    }
    return f2;
};

asyncReadFile().then(
    function (data) {
        console.log(data);
    }
);
