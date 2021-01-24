import { themes } from "../src/themes";
import { tokens, formatTokenName } from "../src/tokens";
import { ThemeName, Theme } from "../src/types";
const prettier = require("prettier");

const prettierOptions = {
  parser: 'scss',
  printWidth: 80,
  singleQuote: true,
  trailingComma: 'es5',
  proseWrap: 'always',
};

export function tokensBuilder(): string {
  const defaultTheme = 'legacy' as ThemeName;
  const defaultThemeName = 'lcds-theme';
  const scssTemplate = tokens.colors.reduce((acc, tokenName) => {
    const token = formatTokenName(tokenName);
    const tokenValue = themes[defaultTheme][tokenName as keyof Theme];

    acc += `
    $${token}: if(
      global-variable-exists('$${defaultThemeName}') and
        map-has-key($${defaultThemeName}, '${token}'),
      map-get($${defaultThemeName}, '${token}'),
      ${tokenValue}
    );
    `;
    return acc;
  }, '');

  return prettier.format(scssTemplate, prettierOptions)
}
