var shell = require('shelljs');
var param2 = process.argv[3];
var param3 = process.argv[4];
var param4 = process.argv[5];
var msg = '';
if (param2) {
	if (param3 && param3 != '') {
		console.log('git tag -a ' + param3 + ' xxxx -m "' + param3 + '"'.info);
		shell.exec('git tag -a ' + param3 + ' xxxx -m "' + param3 + '"');
	}
	console.log('git add --all'.info);
	shell.exec('git add --all && git commit -m "' + param2 + '"');
	msg = 'git commit -m "' + param2 + '"';
	console.log(msg.warn);
	if (param4) {
		console.log('git push -u origin ' + param4 + ''.info);
	} else {
		console.log('git push -u origin master'.info);
	}
	shell.exec('git push -u origin master');
	console.log('git status'.info);
	shell.exec('git status');
} else {
	console.log('git status'.info);
	shell.exec('git status');
	console.log('commit with: z git "msg"'.warn);
}