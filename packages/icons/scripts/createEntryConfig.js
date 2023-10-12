const fs = require('fs');
const path = require('path');

const libDir = path.resolve(__dirname, '../lib');
const outputFilePath = path.resolve(__dirname, '../entryConfig.ts');

fs.readdir(libDir, (err, files) => {
  if (err) {
    console.error('Could not list the directory.', err);
    process.exit(1);
  }

  const entries = files
    .filter((file) => file.endsWith('.tsx'))
    .map((file) => `  ${path.parse(file).name}: './lib/${file}',`)
    .join('\n');

  const outputContent = `const entryConfig = {\n${entries}\n};\n\nexport default entryConfig;\n`; // Changed this line

  fs.writeFile(outputFilePath, outputContent, (err) => {
    if (err) {
      console.error('Error writing file:', err);
    } else {
      console.log('entryConfig.js has been generated!');
    }
  });
});
