//async 当前版本不支持

var readFile = function (a) {
    return new Promise(function (resolve, reject) {
        console.log(a);
        setTimeout(function () {
            resolve(a);
        },1000)
    });
};

var asyncReadFile = async function () {
    var f1 = await readFile('/etc/fstab');
    var f2 = await readFile('/etc/shells');
    return f2;
};

asyncReadFile().then(
    function (data) {
        console.log(data);
    }
);