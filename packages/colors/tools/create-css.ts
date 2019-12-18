import * as fs from 'fs';
import * as path from 'path';
import colors from '../src/design-system-colors';

function getNormalizedColorName(colorName: string) {
  return colorName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

function createStyles(styleName: string, cssProperty: string): string[] {
  return Object.keys(colors).map(colorName => {
    const className = `.lcds-${styleName}-${getNormalizedColorName(colorName)}`;
    const cssProperties = `{ ${cssProperty}: ${(colors as any)[colorName]}; }`;

    return `${className} ${cssProperties}`;
  });
}

function createVariables(variableSurfix: string): string[] {
  return Object.keys(colors).map(colorName => {
    const variableName = getNormalizedColorName(colorName);
    const variableValue = (colors as any)[colorName];

    return `${variableSurfix}lcds-${variableName}: ${variableValue};`;
  });
}

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

const colorTextStyles = createStyles('text', 'color');
const colorBgStyles = createStyles('bg', 'background-color');
const colorCssVariables = createVariables('--');
const colorScssVariables = createVariables('$');

const stylesData = [...colorBgStyles, ...colorTextStyles].join('\n');
const scssVariablesData = colorScssVariables.join('\n');
const cssVariablesData = [':root {', ...colorCssVariables, '}'].join('\n');
const colorsJSONData = JSON.stringify(colors);

fs.writeFileSync(getWritePath('css', 'styles.css'), stylesData);
fs.writeFileSync(getWritePath('css', 'variables.css'), cssVariablesData);
fs.writeFileSync(getWritePath('scss', 'styles.scss'), stylesData);
fs.writeFileSync(getWritePath('scss', 'variables.scss'), scssVariablesData);
fs.writeFileSync(getWritePath('', 'design-system-colors.json'), colorsJSONData);
