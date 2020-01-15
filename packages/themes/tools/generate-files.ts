import * as fs from 'fs';
import * as path from 'path';
import { themesBuilder } from './themes-builder';
import { tokensBuilder } from './tokens-builder';
import { mixinsBuilder } from './mixins-builder';
import { jsonBuilder } from './json-builder';
import { indexScssBuilder } from './index-scss-builder';


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
const tokensScss = tokensBuilder();
const mixinsScss = mixinsBuilder();
const indexScss = indexScssBuilder();
const json = jsonBuilder();

// const themesJSONData = JSON.stringify(colors);

fs.writeFileSync(getWritePath('scss', 'themes.scss'), themesScss);
fs.writeFileSync(getWritePath('scss', 'tokens.scss'), tokensScss);
fs.writeFileSync(getWritePath('scss', 'mixins.scss'), mixinsScss);
fs.writeFileSync(getWritePath('scss', 'index.scss'), indexScss);
fs.writeFileSync(getWritePath('', 'design-system-themes.json'), json);
