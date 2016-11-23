let shell = require('shelljs');
shell.exec('clear');
console.log('*******************************************'.prompt);
let msg = 'Usage: z <command>\r\n\r\nself-update: sudo npm un -g zeta-tools && sudo npm i -g zeta-tools\r\nupdate: sudo ncu -ua && sudo ncu -m bower -ua\r\nls: clear && pwd && ls -lashF\r\ndu: clear && pwd && du -hsc .[!.]* * | sort -hr\r\nclear && pwd && du -hsc .[!.]* * | gsort -hr (osx)\r\ncpu: top -o vsize\r\ngit $msg: git add --all && git commit -m "$msg" && git push -u origin master\r\ntemplate $template $name: \'cp -R \' + dir + \'/data/templates/\' + template + \' \' + pwd\r\n\r\n>Update NodeJS\r\nsudo npm cache clean -f\r\nsudo npm install -g n\r\nsudo n stable\r\n\r\n>Requeriments for OSX:\r\nbrew install coreutils\r\n\r\n>Uninstall\r\nsudo npm un -g zeta-tools\r\n..or..\r\nsudo npm cache clean\r\nsudo rm -rf /usr/local/lib/node_modules/zeta-tools';
console.log(msg.help);
console.log('\n*******************************************\n'.prompt);
