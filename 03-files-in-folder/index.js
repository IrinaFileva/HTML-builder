const fs = require('fs');
const path = require('path');
const pathSecretFolder = path.join(__dirname, 'secret-folder');

fs.readdir(pathSecretFolder, { withFileTypes: true }, (error, files) => {
  if (error) console.log(error);
  else {
    files.forEach((file) => {
      if (file.isFile()) {
        const fileName = file.name;
        const extName = path.extname(file.name);
        fs.stat(path.join(pathSecretFolder, fileName), (error, item) => {
          if (error) console.log(error);
          else {
            const resultFileName = fileName.replace(extName, '');
            const resultExtName = extName.replace('.', '');
            const resultSize = item.size / 1000;
            const result = `${resultFileName} - ${resultExtName} - ${resultSize}kb`;
            console.log(result);
          }
        });
      }
    });
  }
});
