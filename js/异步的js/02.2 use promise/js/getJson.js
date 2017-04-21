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
var getJson = function (index) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(data[index]);
        },delay);
    });
};
