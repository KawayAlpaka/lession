var data = [];
data.push({value:0});
data.push({value:1});
data.push({value:2});
data.push({value:3});
data.push({value:4});
data.push({value:5});
data.push({value:6});
data.push({value:7});
var delay = 3000;
var getJson = function (index,cb) {
    setTimeout(function () {
        cb(data[index]);
    },delay);
};

var getJsonSync = function (index) {
    var now = Date.now();
    var delayTime = now + delay;
    while (delayTime>now){
        now = Date.now();
    }
    return data[index];
};