# WD.js -- A light weight WebDriver/Se2 client for node.js

## Update node to latest

http://nodejs.org/#download

## Install

```shell
npm install wd-parallel
```

## Authors

  - Mathieu Sabourin ([OniOni](http://github.com/OniOni))
  
## License

  * License - Apache 2: http://www.apache.org/licenses/LICENSE-2.0

## Writing a test!

Start by importing the required library.

```javascript
try {
  p_webdriver = require('wd-parallel');
} catch( err ) { 
  p_webdriver = require('../lib/main');
}
```

Then create a default multiple browser object.

```javascript
var browsers = p_webdriver.remote();
```

Now add a test method to the multiple browser object. This method needs to arguments named browser and desired.

  * This method contains your test logic.
  * Test should be run as if to be run on an object named browser.

```javascript
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
```

Load the configuration for all your browsers from your configuration file.

```javascript
//Load configuration file
browsers.loadConfigFile("examples/config.json");
```

Now you can go ahead and run the test !

```javascript
//Run test on all browsers
browsers.run();
```

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
