const fs = require('fs');
const readChunk = require('read-chunk');
const imageType = require('image-type');
const execFile = require('child_process').execFile;
const cwebp = require('cwebp-bin');
const chalk = require('chalk');
const walk = require('./walk');

const fileList = [];

var path = process.cwd() + '/' + process.argv[2];
if (fs.existsSync(path)) {
  walk(path, function (filePath) {
    var imageTypeData = imageType(readChunk.sync(filePath, 0, 12));
    return imageTypeData && (imageTypeData.ext === 'jpg' || imageTypeData.ext === 'png');
  }, fileList);
}

console.log(chalk.yellow('Found ' + fileList.length + ' image file(s) !'));
fileList.forEach(function (file) {
  execFile(cwebp, [file, '-o', file + '.webp'], function (err) {
    if (err) {
      throw err;
    }
    console.log(chalk.green(file + ' converted!'));
  });
});
