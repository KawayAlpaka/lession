var webdriver = require('selenium-webdriver');

var driver = new webdriver.Builder().
withCapabilities(webdriver.Capabilities.chrome()).
build();

describe('basic test',function(done){
    it('should be on correct page',function(done){
        driver.get('http://www.baidu.com');
        driver.getTitle().then(function(title){
            console.log(title);
            expect(title).toBe('Baidu');
            //Jasmine-node会一直等到这个异步函数执行完毕再调用done()函数来进入下一个测试单元
            done();
        });
    });
});