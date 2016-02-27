var shell = require('shelljs');
var fs = require('fs');
var path = require('path');
var dir = path.resolve(__dirname, '../');
var pwd = process.env.PWD;
if (checkForFile('package.json')) {
	shell.exec('sudo ' + dir + '/node_modules/npm-check-updates/bin/ncu -ua --packageFile ' + pwd + '/package.json');
}
if (checkForFile('bower.json')) {
	shell.exec('sudo ' + dir + '/node_modules/npm-check-updates/bin/ncu -m bower -ua --packageFile ' + pwd +
		'/bower.json');
}

function checkForFile(file) {
	try {
		var stats = fs.lstatSync(pwd + '/' + file);
		return true;
	} catch (e) {
		console.log("No " + file + " file found");
		return false;
	}
}