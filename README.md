# WD.js -- A light weight WebDriver/Se2 client for node.js

## Update node to latest

http://nodejs.org/#download

## Install
...

## Authors

  - Mathieu Sabourin ([OniOni](http://github.com/OniOni))
  
## License

  * License - Apache 2: http://www.apache.org/licenses/LICENSE-2.0

## Usage
...


## Writing a test!

Start by importing the required library.

<pre>
try {
  p_webdriver = require('wd-parallel');
} catch( err ) { 
  p_webdriver = require('../lib/main');
}
</pre>

Then create a default multiple browser object.

<pre>
var browsers = p_webdriver.remote();
</pre>

Now add a test method to the multiple browser object. This method needs to arguments named browser and desired.

  * This method contains your test logic.
  * Test should be run as if to be run on an object named browser.

<pre>
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
</pre>

Load the configuration for all your browsers from your configuration file.

<pre>
//Load configuration file
browsers.loadConfigFile("examples/config.json");
</pre>

Now you can go ahead and run the test !

<pre>
//Run test on all browsers
browsers.run();
</pre>

## Supported Methods
This uses <a href='https://github.com/sebv/node-wd-sync'>node-wd-sync</a> written by <a href='https://github.com/sebv'>sebv</a> so you can check <a href='https://github.com/sebv/node-wd-sync'>this</a> page on supported methods.

### Full JsonWireProtocol mapping:

[full mapping](https://github.com/sebv/wd/blob/master/doc/jsonwiremap-all.md)

## More docs!
<pre>
WD is simply implementing the Selenium JsonWireProtocol, for more details see the official docs:
 - <a href="http://code.google.com/p/selenium/wiki/JsonWireProtocol">http://code.google.com/p/selenium/wiki/JsonWireProtocol</a>
</pre>

## Run the tests!
...
