const fs = require('fs');

function walk(path, selectorFn, fileList) {

  fs.readdirSync(path).forEach(function (item) {

    var itemPath = path + '/' + item;
    var stat = fs.statSync(itemPath);

    if (stat.isFile() && selectorFn && selectorFn(itemPath)) {
      fileList.push(itemPath);
    }
    else if (stat.isDirectory()) {
      walk(itemPath, selectorFn, fileList);
    }
  });
}

module.exports = walk;
