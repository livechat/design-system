const fs = require('fs');
const path = require('path');

const scssFolder = './src/themes/';

function pascalCase(str) {
  return str
    .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
    .replace(/^(.)/, (m, chr) => chr.toUpperCase());
}

const keysMap = new Map();

const files = fs
  .readdirSync(scssFolder)
  .filter((file) => file.endsWith('.scss'));

for (const file of files) {
  let contents = fs.readFileSync(path.join(scssFolder, file), 'utf8');
  // Match CSS variable declarations, possibly multi-line, and check for deprecation comments
  const matches = [
    ...contents.matchAll(/(--[\w-]+)\s*:\s*([^;]+);(?:\s*\/\/\s*deprecated)?/g),
  ];
  matches.forEach(([fullMatch, key, value]) => {
    const isDeprecated = fullMatch.includes('// deprecated');
    keysMap.set(key, { key, isDeprecated });
  });
}

const keys = Array.from(keysMap.values());

let allKeysPresent = true;

for (const file of files) {
  let contents = fs.readFileSync(path.join(scssFolder, file), 'utf8');
  for (const { key } of keys) {
    if (!contents.includes(key)) {
      console.error(`Missing key ${key} in file ${file}`);
      allKeysPresent = false;
    }
  }
}

if (allKeysPresent) {
  const output = `export const DesignToken = {
${keys
  .map(({ key, isDeprecated }) =>
    isDeprecated
      ? `  /** @deprecated */\n  ${pascalCase(key.slice(2))}: '${key}',`
      : `  ${pascalCase(key.slice(2))}: '${key}',`
  )
  .join('\n')}
};

export type DesignTokenKey = keyof typeof DesignToken;
`;

  fs.writeFileSync('./src/foundations/design-token.ts', output);
  console.log('TS file generated successfully');
} else {
  process.exitCode = 1;
  throw new Error('Some DS color keys are missing');
}
