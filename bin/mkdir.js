var shell = require('shelljs');
var param1 = process.argv[2];
shell.exec('mkdir ' + param1 + ' && cd $_');