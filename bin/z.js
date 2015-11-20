#! /usr/local/bin/node

var shell = require('shelljs');
var fs = require('fs');
var path = require('path');
var param = process.argv[2];
if (param === 'version' || param === '-v') {
	var dir = path.resolve(__dirname, '../');
	var file = fs.readFileSync(dir + "/package.json");
	console.log(JSON.parse(file).version);
} else if (param === 'alias') {
	console.log('alias ls="clear && pwd && ls -lashF"');
} else if (param === 'export') {
	console.log('export PS1="\\u:\\W:$ "');
} else if (param === 'ls') {
	shell.exec('clear && pwd && ls -lashF');
} else if (param === 'du') {
	shell.exec('clear && pwd && du -csh * | sort -n');
} else if (param === 'help' || param === '-h') {
	var msg =
		"\nUsage: z <command>\n\nupdate: sudo npm i -g zeta-tools\nls: clear && pwd && ls -lashF\ndu: clear && pwd && du -csh * | sort -n\n";
	console.log(msg);
} else {
	var msg = "\nUsage: z <command>\n\nwhere <command> is one of:\n\tversion, alias, export, ls, du\n";
	console.log(msg);
}