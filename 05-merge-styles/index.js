const fs = require('fs');
const path = require('path');
const stylesFolder = path.join(__dirname, 'styles');
const projectDistFolder = path.join(__dirname, 'project-dist');
const pathBundleFile = path.join(projectDistFolder, 'bundle.css');

fs.readdir(stylesFolder, { withFileTypes: true }, (error, files) => {
  if (error) console.log(error);
  const bundleCssFile = fs.createWriteStream(pathBundleFile);
  files.forEach((file) => {
    if (file.isFile()) {
      const extName = path.extname(file.name);
      if (extName === '.css') {
        const readText = fs.createReadStream(
          path.join(stylesFolder, file.name),
          'utf-8',
        );
        readText.pipe(bundleCssFile);
      }
    }
  });
});
