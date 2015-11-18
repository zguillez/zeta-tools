#! /usr/bin/env node

require('shelljs/global');
var param = process.argv[2];
if (param === 'version' || param === '-v') {
	var fs = require("fs");
	var file = fs.readFileSync("package.json");
	console.log(JSON.parse(file).version);
} else if (param === 'alias') {
	console.log('alias ls="clear && pwd && ls -lashF"');
} else if (param === 'export') {
	console.log('export PS1="\\u:\\W:$ "');
} else if (param === 'ls') {
	exec('clear && pwd && ls -lashF');
} else {
	var msg = "\nUsage: z <command>\n\nwhere <command> is one of:\n\tversion, alias, export, ls\n";
	console.log(msg);
}