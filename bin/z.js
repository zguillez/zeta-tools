#! /usr/local/bin/node

var shell = require('shelljs');
var fs = require('fs');
var path = require('path');
var colors = require('colors');
var param1 = process.argv[2];
var param2 = process.argv[3];
var dir = path.resolve(__dirname, '../');
var pwd = process.env.PWD;
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
//---------------------------------------------------------
if (param1 === 'version' || param1 === '-v') {
	var file = fs.readFileSync(dir + "/package.json");
	console.log(JSON.parse(file).version);
} else if (param1 === 'alias') {
	console.log('alias ls="clear && pwd && ls -lashF"'.info);
} else if (param1 === 'export') {
	console.log('export PS1="\\u:\\W:$ "'.info);
} else if (param1 === 'ls') {
	shell.exec('clear && pwd && ls -lashF');
} else if (param1 === 'du') {
	var isOSX = /^darwin/.test(process.platform);
	if (isOSX) {
		shell.exec('clear && pwd && du -hsc * | gsort -hr');
	} else {
		shell.exec('clear && pwd && du -hsc * | sort -hr');
	}
} else if (param1 === 'update' || param1 === '-u') {
	try {
		stats = fs.lstatSync('package.json');
		shell.exec('sudo ' + dir + '/node_modules/npm-check-updates/bin/npm-check-updates -u --packageFile ' + pwd + '/package.json');
	} catch (e) {
		console.log("No package.json file found");
	}
	try {
		stats = fs.lstatSync('bower.json');
		shell.exec('sudo ' + dir + '/node_modules/npm-check-updates/bin/npm-check-updates -m bower -u --packageFile ' + pwd +
			'/bower.json');
	} catch (e) {
		console.log("No bower.json file found");
	}
} else if (param1 === 'self-update') {
	if (param2 === '-f') {
		shell.exec('sudo npm un -g zeta-tools');
	}
	shell.exec('sudo npm i -g zeta-tools');
} else if (param1 === 'help' || param1 === '-h') {
	shell.exec('clear');
	console.log('*******************************************'.prompt);
	var msg =
		"\nUsage: z <command>\n\nself-update: sudo npm i -g zeta-tools (use -f for unistall first)\nupdate: sudo ncu -u && sudo ncu -m bower -u\nls: clear && pwd && ls -lashF\ndu: clear && pwd && du -hsc * | sort -hr \n    clear && pwd && du -hsc * | gsort -hr (osx) \n\n>Update NodeJS\nsudo npm cache clean -f\nsudo npm install -g n\nsudo n stable\n\n>Requeriments for OSX:\nbrew install coreutils\n\n>Uninstall\nsudo npm un -g zeta-tools\n..or..\nsudo npm cache clean\nsudo rm -rf /usr/local/lib/node_modules/zeta-tools\n";
	console.log(msg.help);
	console.log('\n*******************************************\n'.prompt);
} else {
	var msg =
		"\nUsage: z <command>\n\nwhere <command> is one of:\n\tversion -v, help -h, self-update, update -u, alias, export, ls, du\n";
	console.log(msg.warn);
}