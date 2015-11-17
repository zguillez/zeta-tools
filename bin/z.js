#! /usr/bin/env node
var shell = require("shelljs");

switch(process.argv[2])
{
	case 'alias':
		var command = 'alias ls="clear && pwd && ls -lashF"';
		shell.exec('echo ' + command);
		break;
	case 'ls':
		shell.exec('clear && pwd && ls -lashF');
		break;
	default:
		shell.exec('echo "ERR: No params!"');
}