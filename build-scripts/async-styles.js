const fs = require('fs');
const chalk = require('chalk');

const path = process.cwd() + '/' + process.argv[2] + '/index.html';
if (fs.existsSync(path)) {
  console.log(chalk.yellow('Patching index file to suport lazy styles...'));
  let file = fs
    .readFileSync(path)
    .toString()
    .replace(/<(link href="styles\..+\.bundle\.css" rel="stylesheet")/, '<$1 media="nope!" onload="this.media=\'all\'"');
  fs.writeFileSync(path, file);
  console.log(chalk.green('Done!'));
}
