const fs = require('fs');
const path = require('path');
const readLine = require('readline');
const { stdin, stdout } = process;
const interFace = readLine.createInterface(stdin);
const writeableStream = fs.createWriteStream(path.join(__dirname, 'text.txt'));

stdout.write('Please, enter text?\n');

process.on('SIGINT', () => {
  stdout.write('Good luck!');
  process.exit();
});

interFace.on('line', (text) => {
  if (text === 'exit') {
    stdout.write('Good luck!');
    process.exit();
  }
  writeableStream.write(`${text}\n`);
});
