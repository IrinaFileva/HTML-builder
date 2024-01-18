const fs = require('fs');
const path = require('path');
const pathFile = path.join(__dirname, 'files');
const pathFileCopy = path.join(__dirname, 'files-copy');

function copyDir() {
  fs.promises.mkdir(pathFileCopy, { recursive: true });
  fs.readdir(pathFile, { withFileTypes: true }, (error, files) => {
    if (error) console.log(error);
    else {
      files.forEach((file) => {
        const fileName = file.name;
        const startingFile = path.join(pathFile, fileName);
        const finishedFile = path.join(pathFileCopy, fileName);
        fs.promises.copyFile(startingFile, path.join(finishedFile));
      });
    }
  });
}

copyDir();
