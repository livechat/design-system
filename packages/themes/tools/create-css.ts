import * as fs from 'fs';
import * as path from 'path';
import { themesBuilder } from './themes-builder';


function createDirectory(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function getWritePath(subDirectory: string, fileName: string): string {
  const dirPath = path.join(__dirname, '..', 'dist');

  createDirectory(dirPath);

  const subDirPath = path.join(dirPath, subDirectory);

  createDirectory(subDirPath);

  return path.join(subDirPath, fileName);
}

const themesScss = themesBuilder();

// const themesJSONData = JSON.stringify(colors);

fs.writeFileSync(getWritePath('scss', 'themes.scss'), themesScss);
// fs.writeFileSync(getWritePath('', 'design-system-colors.json'), colorsJSONData);
