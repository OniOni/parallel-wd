var p_webdriver;
try {
  p_webdriver = require('wd-parallel');
} catch( err ) { 
  p_webdriver = require('../lib/main');
}

var browsers = p_webdriver.remote();

browsers.test = function(browser, desired) {

    console.log("server status:", browser.status());
    browser.init(desired);
        
    browser.get("http://google.com");
    console.log("title is "+browser.title());

    var queryField = browser.elementByName('q');
    browser.type(queryField, "Hello World");
    browser.type(queryField, "\n");

    browser.setWaitTimeout(3000);
    browser.elementByCss('#ires'); // waiting for new page to load
    console.log(browser.title());

    browser.quit();

};

//Load configuration file
browsers.loadConfigFile("examples/config.json");
//Run test on all browsers
browsers.run();



