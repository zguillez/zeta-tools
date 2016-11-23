let shell = require('shelljs');
let path = require('path');
let dir = path.resolve(__dirname, '../');
let pwd = process.env.PWD;
let template = process.argv[3];
let name = process.argv[4];
shell.exec('cp -R ' + dir + '/data/templates/' + template + ' ' + pwd);
if (name && name !== '') {
  shell.exec('mv ' + template + ' ' + name);
}
