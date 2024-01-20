const fs = require('fs');
const fsPro = require('fs').promises;
const path = require('path');
const pathComponentsFolder = path.join(__dirname, 'components');
const pathAssetsFolder = path.join(__dirname, 'assets');
const pathProjectDistFolder = path.join(__dirname, 'project-dist');
const pathTemplateFile = path.join(__dirname, 'template.html');
const pathNewHTMLFile = path.join(pathProjectDistFolder, 'index.html');
const pathCopyAssetsFolder = path.join(pathProjectDistFolder, 'assets');
const pathStyleFolder = path.join(__dirname, 'styles');
const pathCopyStyleFolder = path.join(pathProjectDistFolder, 'style.css');

async function startTack() {
  await fsPro.mkdir(pathProjectDistFolder, { recursive: true });
  createFileHTML();
  copyAssets();
  copyCSS();
}

async function createFileHTML() {
  try {
    let fileContent = await fsPro.readFile(pathTemplateFile, 'utf-8');
    const files = await fsPro.readdir(pathComponentsFolder, {
      withFileTypes: true,
    });
    for (let file of files) {
      const fileName = file.name.replace(path.extname(file.name), '');
      if (fileContent.includes(`{{${fileName}}}`)) {
        const pathFile = path.join(pathComponentsFolder, file.name);
        let data = await fsPro.readFile(pathFile, 'utf-8');
        fileContent = await fileContent.replaceAll(`{{${fileName}}}`, data);
      }
    }
    await fsPro.writeFile(pathNewHTMLFile, fileContent);
  } catch (err) {
    console.log(err);
  }
}

function copyAssets() {
  fsPro.mkdir(pathCopyAssetsFolder, { recursive: true });

  fs.readdir(pathAssetsFolder, { withFileTypes: true }, (error, folders) => {
    if (error) console.log(error);
    folders.forEach((folder) => {
      const pathFolder = path.join(pathAssetsFolder, folder.name);
      fs.stat(pathFolder, (error, item) => {
        if (error) console.log(error);
        if (item.isDirectory()) {
          const pathCopyFolder = path.join(pathCopyAssetsFolder, folder.name);
          fsPro.mkdir(pathCopyFolder, { recursive: true });
          fs.readdir(pathFolder, { withFileTypes: true }, (error, files) => {
            if (error) console.log(error);
            else {
              files.forEach((file) => {
                const fileName = file.name;
                const startingFile = path.join(pathFolder, fileName);
                const finishedFile = path.join(pathCopyFolder, fileName);
                fs.promises.copyFile(startingFile, path.join(finishedFile));
              });
            }
          });
        }
      });
    });
  });
}

function copyCSS() {
  fs.readdir(pathStyleFolder, { withFileTypes: true }, (error, files) => {
    if (error) console.log(error);
    const bundleCssFile = fs.createWriteStream(pathCopyStyleFolder);
    files.forEach((file) => {
      const extName = path.extname(file.name);
      if (extName === '.css') {
        const readText = fs.createReadStream(
          path.join(pathStyleFolder, file.name),
        );
        readText.pipe(bundleCssFile);
      }
    });
  });
}

startTack();
