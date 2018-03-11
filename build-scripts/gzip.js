const fs = require('fs');
const fs_path = require('path');
const zlib = require('zlib');
const chalk = require('chalk');
const walk = require('./walk');

const extRegex = /(?:html|js|css|svg|ico|eot|ttf|woff)/;
const fileList = [];

var path = process.cwd() + '/' + process.argv[2];
if (fs.existsSync(path)) {
  walk(path, function (filePath) {
    return extRegex.test(fs_path.extname(filePath)) && !filePath.endsWith('appsettings.json');
  }, fileList);
}

console.log(chalk.yellow('Found ' + fileList.length + ' file(s) to gzip!'));
fileList.forEach(function (file) {
  fs.createReadStream(file)
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream(file + '.gz'));
  console.log(chalk.green(file + ' gzipped!'));
});
