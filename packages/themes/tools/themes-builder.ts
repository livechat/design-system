import { themes } from "../src/themes";
import { tokens, formatTokenName } from "../src/tokens";
import { ThemeName } from "../src/types";
const prettier = require("prettier");

const prettierOptions = {
  parser: 'scss',
  printWidth: 80,
  singleQuote: true,
  trailingComma: 'es5',
  proseWrap: 'always',
};

export function themesBuilder(): string {
  const themesObjects = Object.keys(themes).map(themeName => {
    const name = `$lcds-theme--${themeName}`;

    return tokens.colors.reduce((acc, tokenName) => {
      const token = formatTokenName(tokenName);
      // @ts-ignore
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
