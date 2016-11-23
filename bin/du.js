let shell = require('shelljs');
let isOSX = /^darwin/.test(process.platform);
if (isOSX) {
  shell.exec('clear && pwd && du -hsc .[!.]* * | gsort -hr');
} else {
  shell.exec('clear && pwd && du -hsc .[!.]* * | sort -hr');
}
