// CONFIGURE SAUCE CREDENTIALS HER!E
var username = "msabourin",
accessKey = "aae81464-8dd5-41b4-93e6-2c8426bbf5d6";
  
var p_webdriver;
try {
  p_webdriver = require('wd-parallel');
} catch( err ) { 
  p_webdriver = require('../lib/main');
}

var assert = require('assert');

var browsers = p_webdriver.remote("ondemand.saucelabs.com", 80, username, accessKey);

var desired = [
    {
	tags: ["examples"]
	, name: "This is an example test"
	, browserName: "firefox"
	, javascriptEnabled: true
	, command, function(meth, path){
	    console.log(' > \x1b[33m%s\x1b[0m: %s', meth, path);
	}
	, status, function(info){
	    console.log('\x1b[36m%s\x1b[0m', info);
	}
    }
    ,
    {
	tags: ["examples"]
	, name: "This is an example test"
	, browserName: "chrome"
	, javascriptEnabled: true
	, command, function(meth, path){
	    console.log(' > \x1b[33m%s\x1b[0m: %s', meth, path);
	}
	, status, function(info){
	    console.log('\x1b[36m%s\x1b[0m', info);
	}
    }
]

browsers.init(desired, function() {
  browsers.get("http://saucelabs.com/test/guinea-pig", function() {
    browsers.title(function(err, title) {
      assert.ok(~title.indexOf('I am a page title - Sauce Labs'), 'Wrong title!');
      browsers.elementById('submit', function(err, el) {
        browsers.clickElement(el, function() {
          browsers.eval("window.location.href", function(err, title) {
            assert.ok(~title.indexOf('#'), 'Wrong title!');
            browsers.quit()
          })
        })
      })
    })
  })
})


