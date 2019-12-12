import * as fs from 'fs';
import * as path from 'path';
import colors from '../src/design-system-colors';

// creating template string with color styles - css classes with color property
const colorTextStyles = Object.keys(colors).map(colorName => {
  const className = `.lcds-text-${colorName
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase()}`;
  const cssProperties = `{ color: ${(colors as any)[colorName]}; }`;

  return `${className} ${cssProperties}`;
});

const colorBgStyles = Object.keys(colors).map(colorName => {
  const className = `.lcds-bg-${colorName
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase()}`;
  const cssProperties = `{ background-color: ${(colors as any)[colorName]}; }`;

  return `${className} ${cssProperties}`;
});

const colorStyles = [...colorBgStyles, ...colorTextStyles];

// creating template string with color variables
const colorVariables = Object.keys(colors).map(colorName => {
  const variableName = colorName
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase();
  const variableValue = (colors as any)[colorName];

  return `$lcds-${variableName}: ${variableValue};`;
});

const stylesData = colorStyles.join('\n');
const variablesData = colorVariables.join('\n');

// saving css file
const dirPath = path.join(__dirname, '..', 'dist');

if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath, { recursive: true });
}

fs.writeFileSync(path.join(dirPath, 'design-system-colors.css'), stylesData);

// saving scss files
const scssDirPath = path.join(dirPath, 'scss');

if (!fs.existsSync(scssDirPath)) {
  fs.mkdirSync(scssDirPath, { recursive: true });
}

fs.writeFileSync(path.join(scssDirPath, 'styles.scss'), stylesData);
fs.writeFileSync(path.join(scssDirPath, 'variables.scss'), variablesData);
