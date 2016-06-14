var DRIVER  = require('selenium-webdriver');
var profile = DRIVER.Capabilities.chrome();
profile.set( 'browserName', 'chrome' );
profile.set('chromeOptions', {
    'args' : ['--lang=EN', '--disable-popup-blocking', '--user-agent=selenium-webdriver' ]
});
var BUILDER = new DRIVER.Builder().withCapabilities( profile );
var BROWSER = BUILDER.build();
BROWSER.get('http://www.baidu.com/').then(function(){
    BROWSER.executeScript( 'document.f.wd.value="asd";document.f.submit();' );
});