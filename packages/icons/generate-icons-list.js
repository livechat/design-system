/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';

function toPascalCase(str) {
  return str
    .split(/[-_ ]+/)
    .map(
      (word) => `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}`
    )
    .join('');
}

const SVG_DIRECTORY = './lib/assets';
const OUTPUT_FILE = './lib/icon/icons.ts';

fs.readdir(SVG_DIRECTORY, (err, items) => {
  if (err) {
    console.error(`Error reading the directory: ${err}`);

    return;
  }

  const folders = items.filter((item) => {
    const fullPath = path.join(SVG_DIRECTORY, item);

    return fs.statSync(fullPath).isDirectory();
  });

  // Header
  let outputContent = '/// <reference types="vite-plugin-svgr/client" />\n';
  outputContent += "import { lazy } from 'react';\n\n";

  // Iterate through each folder in the directory
  folders.forEach((folder) => {
    const constantName = toPascalCase(folder);
    let folderContent = `export const ${constantName} = {\n`;

    const filesInFolder = fs.readdirSync(path.join(SVG_DIRECTORY, folder));

    const iconNamesForFolder = [];

    filesInFolder.forEach((file) => {
      if (path.extname(file) === '.svg') {
        const fileNameWithoutExt = toPascalCase(path.basename(file, '.svg'));
        folderContent += `  ${fileNameWithoutExt}: lazy(
    async () => import('../assets/${folder}/${file}?react')
  ),\n`;

        iconNamesForFolder.push(fileNameWithoutExt);
      }
    });

    folderContent += '};\n\n';
    outputContent += folderContent;

    // Array of icon names for the current folder
    outputContent += `export const ${constantName}Names = [${iconNamesForFolder
      .map((name) => `'${name}'`)
      .join(', ')}];\n\n`;
  });

  // Footer
  outputContent += 'export const icons = {\n';
  outputContent += '  tabler: Tabler,\n';
  outputContent += '};\n';

  fs.writeFile(OUTPUT_FILE, outputContent, (writeErr) => {
    if (writeErr) {
      console.error(`Error writing to the output file: ${writeErr}`);

      return;
    }

    console.log(`Constants generated in ${OUTPUT_FILE}`);
  });
});
/* eslint-enable no-console */
