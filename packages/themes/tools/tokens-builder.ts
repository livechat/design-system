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

export function tokensBuilder(): string {
  const defaultTheme = 'legacy';
  const defaultThemeName = 'lcds-theme';
  const scssTemplate = tokens.colors.reduce((acc, tokenName) => {
    const token = formatTokenName(tokenName);
    acc += `
    $${token}: if(
      global-variable-exists('$${defaultThemeName}') and
        map-has-key($${defaultThemeName}, '${token}'),
      map-get($${defaultThemeName}, '${token}'),
      ${themes[defaultTheme][tokenName]}
    );
    `;
    return acc;
  }, '');

  return prettier.format(scssTemplate, prettierOptions)
}
