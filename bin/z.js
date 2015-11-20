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
	var isOSX = /^darwin/.test(process.platform);
	if (isOSX) {
		shell.exec('clear && pwd && du -hsc * | gsort -hr');
	} else {
		shell.exec('clear && pwd && du -hsc * | sort -hr');
	}
} else if (param === 'self-update') {
	shell.exec('sudo npm i -g zeta-tools');
} else if (param === 'help' || param === '-h') {
	var msg =
		"Usage: z <command>\n\nself-update: sudo npm i -g zeta-tools\nls: clear && pwd && ls -lashF\ndu: clear && pwd && du -hsc * | sort -hr \n      clear && pwd && du -hsc * | gsort -hr (osx) \n\n>Requeriments for OSX:\nbrew install coreutils\n\n";
	console.log(msg);
} else {
	var msg = "\nUsage: z <command>\n\nwhere <command> is one of:\n\tversion, self-update, alias, export, ls, du\n";
	console.log(msg);
}