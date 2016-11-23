let fs = require('fs');
let path = require('path');
let https = require('https');
let dir = path.resolve(__dirname, '../');
let file = fs.readFileSync(dir + '/package.json');
let version = JSON.parse(file).version;
let url = 'https://raw.githubusercontent.com/zguillez/zeta-tools/master/package.json';
let body = '';
let msg = '';
// ---------------------------------------------------------
console.log(JSON.parse(file).version);
https.get(url, function(res) {
  res.on('data', function(chunk) {
    body += chunk;
  });
  res.on('end', function() {
    let packagejson = JSON.parse(body);
    if (version !== packagejson.version) {
      msg = 'New version available: ' + packagejson.version + '\nUpdate with: z self-update';
      console.log(msg.info);
    }
  });
});
