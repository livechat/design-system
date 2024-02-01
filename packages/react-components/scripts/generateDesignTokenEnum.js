const fs = require('fs');
const path = require('path');

const scssFolder = './src/themes/';

function pascalCase(str) {
  return str
    .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
    .replace(/^(.)/, (m, chr) => chr.toUpperCase());
}

const keysSet = new Set();

const files = fs
  .readdirSync(scssFolder)
  .filter((file) => file.endsWith('.scss'));

for (const file of files) {
  const contents = fs.readFileSync(path.join(scssFolder, file), 'utf8');
  const matches = contents.match(/--[\w-]+/g) || [];
  matches.forEach((key) => keysSet.add(key));
}

const keys = Array.from(keysSet);

let allKeysPresent = true;

for (const file of files) {
  const contents = fs.readFileSync(path.join(scssFolder, file), 'utf8');
  for (const key of keys) {
    if (!contents.includes(key)) {
      console.error(`Missing key ${key} in file ${file}`);
      allKeysPresent = false;
    }
  }
}

if (allKeysPresent) {
  const output = `export const DesignToken = {
  ${keys.map((key) => `${pascalCase(key.slice(2))}: '${key}',`).join('\n  ')}
};

export type DesignTokenKey = keyof typeof DesignToken;
`;

  fs.writeFileSync('./src/foundations/design-token.ts', output);
  console.log('TS file generated successfully');
}
