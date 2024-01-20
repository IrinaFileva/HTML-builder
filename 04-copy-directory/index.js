const fs = require('fs/promises');
const path = require('path');
const pathFile = path.join(__dirname, 'files');
const pathFileCopy = path.join(__dirname, 'files-copy');

async function copyDir() {
  try {
    await fs.rm(pathFileCopy, { recursive: true, force: true });
    await fs.mkdir(pathFileCopy, { recursive: true });
    const files = await fs.readdir(pathFile, { withFileTypes: true });
    for (let file of files) {
      const fileName = file.name;
      const startingFile = path.join(pathFile, fileName);
      const finishedFile = path.join(pathFileCopy, fileName);
      fs.copyFile(startingFile, path.join(finishedFile));
    }
  } catch (err) {
    console.log(err);
  }
}

copyDir();
