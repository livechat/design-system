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

  let outputContent = '/// <reference types="vite-plugin-svgr/client" />\n';
  outputContent += "import { lazy } from 'react';\n\n";

  const folders = items.filter((item) => {
    const fullPath = path.join(SVG_DIRECTORY, item);

    return fs.statSync(fullPath).isDirectory();
  });

  folders.forEach((folder) => {
    const constantName = toPascalCase(folder);

    let folderContent = `export const ${constantName} = {\n`;

    const filesInFolder = fs.readdirSync(path.join(SVG_DIRECTORY, folder));

    filesInFolder.forEach((file) => {
      if (path.extname(file) === '.svg') {
        const fileNameWithoutExt = toPascalCase(path.basename(file, '.svg'));
        folderContent += `  ${fileNameWithoutExt}: lazy(
    async () => import('../assets/${folder}/${file}?react')
  ),\n`;
      }
    });

    folderContent += '};\n\n';
    outputContent += folderContent;
  });

  outputContent += 'export const icons = {\n';
  outputContent += '  tabler: Tabler,\n';
  outputContent += '  material: Material,\n';
  outputContent += '};\n';

  fs.writeFile(OUTPUT_FILE, outputContent, (writeErr) => {
    if (writeErr) {
      console.error(`Error writing to the output file: ${writeErr}`);

      return;
    }

    console.log(`Icons list generated into ${OUTPUT_FILE}`);
  });
});
/* eslint-enable no-console */
