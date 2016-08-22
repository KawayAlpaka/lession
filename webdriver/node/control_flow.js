var webdriver  = require('selenium-webdriver');
var flow = webdriver.promise.controlFlow();

var driver = new webdriver.Builder().
withCapabilities(webdriver.Capabilities.chrome()).
build();

flow.execute(function () {
    var d = webdriver.promise.defer();
    driver.get('http://www.baidu.com').then(function (val) {
        // d.fulfill(val);
        d.fulfill("ha");
    });
    return d.promise;
}).then(function (data) {
    console.log(data);
});
flow.execute(function () {
    console.log(1);
    console.log(arguments);
});
flow.execute(function () {
    console.log(2);
    console.log(arguments);
});