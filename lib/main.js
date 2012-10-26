var wdSync = require('wd-sync');

var __slice = Array.prototype.slice;

// parses server parameters
parseRemoteWdConfig = function(args) {
  var accessKey, host, path, port, username, _ref;
  if (typeof (args != null ? args[0] : void 0) === 'object') {
    return args[0]
  } else {
    host = args[0], port = args[1], username = args[2], accessKey = args[3];
    return {
      host: host,
      port: port,
      username: username,
      accessKey: accessKey,
    };
  }
};

var p_webdriver = function(remoteWdConfig) {
    if (remoteWdConfig)
	this.remoteWdConfig = remoteWdConfig;

    this.clients = [];

    this.test = null;
}

p_webdriver.prototype.run = function(desired) {
    var _this = this;

    //Always prefer desired value passed as argument
    if (desired) {
	this.desired = desired;
    }

    for (var i=0; i < this.desired.length; i++){
	//Create  client
	_this.clients[i] = wdSync.remote(this.remoteWdConfig);
	
	//Set up callbacks
	for (var k in this.desired[i].callbacks){
	    _this.clients[i].browser.on(k, this.desired[i].callbacks[k]);
	}

	//Run tests for current browser
	_this.clients[i].sync( function() {_this.test(_this.clients[i].browser, _this.desired[i]) });
    }
}

p_webdriver.prototype.loadConfigFile = function(json) {
    try{
	var fs = require('fs');
	var file = fs.readFileSync(json, "utf8");
	var config = JSON.parse(file);
    } catch (e) {
	return false;
    }

    this.desired = config['desired'];
    
    if (this.remoteWdConfig)
	this.remoteWdConfig = config['remote'];
}


// creates the webdriver object
// server parameters can be passed in 2 ways
// - as a list of arguments host,port, username, accessKey
// - as an option object containing the fields above
exports.remote = function() {
    var args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    var rwc = parseRemoteWdConfig(args);  
    return new p_webdriver(rwc);
}

