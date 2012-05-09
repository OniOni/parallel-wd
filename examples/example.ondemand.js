// CONFIGURE SAUCE CREDENTIALS HERE !
var username = "<USERNAME>",
accessKey = "<ACCESS KEY>";

var p_webdriver;
try {
  p_webdriver = require('wd-parallel');
} catch( err ) { 
  p_webdriver = require('../lib/main');
}

var browsers = p_webdriver.remote(
    "ondemand.saucelabs.com", 
    80,
    username, 
    accessKey
);

var p_desired = [
    {
	tags: ["examples"]
	, name: "parallel test 1/4"
	, browserName: "firefox"
	, javascriptEnabled: true
	, callbacks: 
	{
	    command: function(meth, path){
		console.log(' > \x1b[33m%s\x1b[0m: %s', meth, path);
	    }
	    , status: function(info){
		console.log('\x1b[36m%s\x1b[0m', info);
	    }
	}
    }
    ,
    {
	tags: ["examples"]
	, name: "parallel test 2/4"
	, browserName: "chrome"
	, javascriptEnabled: true
    }
    ,
    {
	tags: ["examples"]
	, name: "parallel test 3/4"
	, browserName: "firefox"
	, platform: "LINUX"
	, javascriptEnabled: true
    }
    ,
    {
	tags: ["examples"]
	, name: "parallel test 4/4"
	, browserName: "chrome"
	, platform: "LINUX"
	, javascriptEnabled: true
    }
]

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

browsers.run(p_desired);



