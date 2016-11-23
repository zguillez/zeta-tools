let shell = require('shelljs');
let fs = require('fs');
let path = require('path');
let dir = path.resolve(__dirname, '../');
let pwd = process.env.PWD;
if (checkForFile('package.json')) {
  shell.exec('sudo ' + dir + '/node_modules/npm-check-updates/bin/ncu -ua --packageFile ' + pwd + '/package.json');
}
if (checkForFile('bower.json')) {
  shell.exec('sudo ' + dir + '/node_modules/npm-check-updates/bin/ncu -m bower -ua --packageFile ' + pwd + '/bower.json');
}
/**
 * Check for file exist
 * @param {string} file File name
 * @return {boolean} Return a boolean
 */
function checkForFile(file) {
  try {
    let stats = fs.lstatSync(pwd + '/' + file);
    return stats;
  } catch (e) {
    console.log('No ' + file + ' file found');
    return false;
  }
}
