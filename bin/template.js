var shell = require('shelljs');
var fs = require('fs');
var path = require('path');
var dir = path.resolve(__dirname, '../');
var pwd = process.env.PWD;
var template = process.argv[3];
var name = process.argv[4];
shell.exec('cp -R ' + dir + '/data/templates/' + template + ' ' + pwd);
if (name && name != '') {
	shell.exec('mv ' + template + ' ' + name);
}