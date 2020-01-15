import { themes } from "../src/themes";
import { tokens, formatTokenName } from "../src/tokens";
const prettier = require("prettier");

const prettierOptions = {
  parser: 'scss',
  printWidth: 80,
  singleQuote: true,
  trailingComma: 'es5',
  proseWrap: 'always',
};

// $lcds-theme--light: (
//   interactive-01: #0f62fe,
//   interactive-02: #393939,
//   ui-background: #ffffff
// );

// $lcds-theme--legacy: (
//   interactive-01: #0f62fe,
//   interactive-02: #393939,
//   ui-background: #ffffff
// );

// $lcds-theme: (
//   interactive-01:
//     if(
//       global-variable-exists('interactive-01'),
//       $interactive-01,
//       map-get($lcds-theme--legacy, 'interactive-01')
//     ),
//   interactive-02:
//     if(
//       global-variable-exists('interactive-02'),
//       $interactive-02,
//       map-get($lcds-theme--legacy, 'interactive-02')
//     ),
//   ui-background:
//     if(
//       global-variable-exists('ui-background'),
//       $ui-background,
//       map-get($lcds-theme--legacy, 'ui-background')
//     )
// );

export function themesBuilder(): string {
  const themesObjects = Object.keys(themes).map(themeName => {
    const name = `$lcds-theme--${themeName}`;

    return tokens.colors.reduce((acc, tokenName) => {
      const token = formatTokenName(tokenName);
      acc += `${token}: ${themes[themeName][tokenName]},`;
      return acc;
    }, `${name}: (`) + ');';
  })

  const defaultThemeName = 'lcds-theme--legacy';
  const defaultTheme = tokens.colors.reduce((acc, tokenName) => {
    const token = formatTokenName(tokenName);
    acc += `
    ${token}:
      if(
        global-variable-exists('${token}'),
        $${token},
        map-get($${defaultThemeName}, '${token}')
      ),
    `;
    return acc;
  }, '$lcds-theme: (') + ');'

  return prettier.format([...themesObjects, defaultTheme].join(''), prettierOptions)
}
