#! /usr/local/bin/node

var shell = require('shelljs');
var fs = require('fs');
var path = require('path');
var http = require("http");
var https = require("https");
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
var file, version, url, body, msg, stats;
//---------------------------------------------------------
if (param1 === 'version' || param1 === '-v') {
	checkForUpdate(true);
} else if (param1 === 'alias') {
	console.log('alias ls="clear && pwd && ls -lashF"'.info);
} else if (param1 === 'export') {
	console.log('export PS1="\\u:\\W:$ "'.info);
} else if (param1 === 'ls') {
	shell.exec('clear && pwd && ls -lashF');
} else if (param1 === 'du') {
	var isOSX = /^darwin/.test(process.platform);
	if (isOSX) {
		shell.exec('clear && pwd && du -hsc .[!.]* * | gsort -hr');
	} else {
		shell.exec('clear && pwd && du -hsc .[!.]* * | sort -hr');
	}
} else if (param1 === 'cpu') {
	console.log('top -o vsize'.info);
} else if (param1 === 'git') {
	if (param2) {
		console.log('git add --all'.info);
		shell.exec('git add --all && git commit -m "' + param2 + '"');
		msg = 'git commit -m "' + param2 + '"';
		console.log(msg.warn);
		console.log('git push -u origin master'.info);
		shell.exec('git push -u origin master');
		console.log('git status'.info);
		shell.exec('git status');
	} else {
		console.log('git status'.info);
		shell.exec('git status');
		console.log('commit with: z git "msg"'.warn);
	}
} else if (param1 === 'update' || param1 === '-u') {
	if (checkForFile('package.json')) {
		shell.exec('sudo ' + dir + '/node_modules/npm-check-updates/bin/ncu -ua --packageFile ' + pwd + '/package.json');
	}
	if (checkForFile('bower.json')) {
		shell.exec('sudo ' + dir + '/node_modules/npm-check-updates/bin/ncu -m bower -ua --packageFile ' + pwd +
			'/bower.json');
	}
} else if (param1 === 'self-update') {
	shell.exec('sudo npm un -g zeta-tools && sudo npm i -g zeta-tools');
} else if (param1 === 'help' || param1 === '-h') {
	shell.exec('clear');
	console.log('*******************************************'.prompt);
	msg =
		"\nUsage: z <command>\r\n\r\nself-update: sudo npm un -g zeta-tools && sudo npm i -g zeta-tools\r\nupdate: sudo ncu -ua && sudo ncu -m bower -ua\r\nls: clear && pwd && ls -lashF\r\ndu: clear && pwd && du -hsc .[!.]* * | sort -hr \r\n    clear && pwd && du -hsc .[!.]* * | gsort -hr (osx) \r\ncpu: top -o vsize\r\ngit $msg: git add --all && git commit -m \"$msg\" && git push -u origin master\r\n\r\n>Update NodeJS\r\nsudo npm cache clean -f\r\nsudo npm install -g n\r\nsudo n stable\r\n\r\n>Requeriments for OSX:\r\nbrew install coreutils\r\n\r\n>Uninstall\r\nsudo npm un -g zeta-tools\r\n..or..\r\nsudo npm cache clean\r\nsudo rm -rf \/usr\/local\/lib\/node_modules\/zeta-tools\r\n";
	console.log(msg.help);
	console.log('\n*******************************************\n'.prompt);
} else {
	msg =
		"\nUsage: z <command>\r\n\r\nwhere <command> is one of:\r\n\tversion -v, help -h, self-update, update -u, alias, export, ls, du, cpu, git $msg\r\n";
	console.log(msg.warn);
}
//---------------------------------------------------------
function checkForFile(file) {
	try {
		stats = fs.lstatSync(file);
		return true;
	} catch (e) {
		console.log("No " + file + " file found");
		return false;
	}
}

function checkForUpdate(showCurrent) {
	file = fs.readFileSync(dir + "/package.json");
	version = JSON.parse(file).version;
	if (showCurrent) {
		console.log(JSON.parse(file).version);
	}
	url = 'https://raw.githubusercontent.com/zguillez/zeta-tools/master/package.json';
	https.get(url, function(res) {
		body = '';
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
}
//---------------------------------------------------------
//