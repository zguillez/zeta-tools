var shell = require('shelljs');
var isOSX = /^darwin/.test(process.platform);
if (isOSX) {
	shell.exec('clear && pwd && du -hsc .[!.]* * | gsort -hr');
} else {
	shell.exec('clear && pwd && du -hsc .[!.]* * | sort -hr');
}