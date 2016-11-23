let shell = require('shelljs');
let param2 = process.argv[3];
let param3 = process.argv[4];
let param4 = process.argv[5];
let msg = '';
if (param2) {
  console.log('git add --all'.info);
  shell.exec('git add --all && git commit -m "' + param2 + '"');
  msg = 'git commit -m "' + param2 + '"';
  console.log(msg.warn);
  if (param3 && param3 !== '') {
    msg = 'git tag -a ' + param3 + ' -m "' + param3 + '"';
    console.log(msg.info);
    shell.exec('git tag -a ' + param3 + ' -m "' + param3 + '"');
  }
  if (param4) {
    msg = 'git push -u origin ' + param4 + ' --tags';
    console.log(msg.info);
    shell.exec('git push -u origin ' + param4 + ' --tags');
  } else {
    console.log('git push -u origin master --tags'.info);
    shell.exec('git push -u origin master --tags');
  }
  console.log('git status'.info);
  shell.exec('git status');
} else {
  console.log('git status'.info);
  shell.exec('git status');
  console.log('commit with: z git "msg"'.warn);
}
