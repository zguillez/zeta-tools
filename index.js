#! /usr/local/bin/node

var colors = require('colors');
var param1 = process.argv[2];
var param2 = process.argv[3];
colors.setTheme({
	silly: 'rainbow',
	input: 'grey',
	verbose: 'cyan',
	prompt: 'grey',
	info: 'green',
	data: 'grey',
	help: 'cyan',
	warn: 'yellow',
	debug: 'blue',
	error: 'red'
});
if (param1 === 'version' || param1 === '-v') {
	require('./bin/version.js');
} else if (param1 === 'alias') {
	require('./bin/alias.js');
} else if (param1 === 'export') {
	require('./bin/export.js');
} else if (param1 === 'cpu') {
	require('./bin/cpu.js');
} else if (param1 === 'ls') {
	require('./bin/ls.js');
} else if (param1 === 'du') {
	require('./bin/du.js');
} else if (param1 === 'git') {
	require('./bin/git.js');
} else if (param1 === 'update' || param1 === '-u') {
	require('./bin/update.js');
} else if (param1 === 'self-update') {
	require('./bin/self-update.js');
} else if (param1 === 'help' || param1 === '-h') {
	require('./bin/help.js');
} else {
	require('./bin/else.js');
}