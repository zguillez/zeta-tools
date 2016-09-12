var fs = require('fs');
var path = require('path');
var https = require("https");
var dir = path.resolve(__dirname, '../');
var file = fs.readFileSync(dir + "/package.json");
var version = JSON.parse(file).version;
var url = 'https://raw.githubusercontent.com/zguillez/zeta-tools/master/package.json';
var body = '';
var msg = '';
//---------------------------------------------------------
console.log(JSON.parse(file).version);
https.get(url, function(res) {
	res.on('data', function(chunk) {
		body += chunk;
	});
	res.on('end', function() {
		var packagejson = JSON.parse(body);
		if (version !== packagejson.version) {
			msg = "New version available: " + packagejson.version + '\nUpdate with: z self-update';
			console.log(msg.info);
		}
	});
});