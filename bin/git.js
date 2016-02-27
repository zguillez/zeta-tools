var shell = require('shelljs');
var param1 = process.argv[2];
var param2 = process.argv[3];
var msg = '';
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