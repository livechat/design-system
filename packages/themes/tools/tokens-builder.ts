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

// $interactive-01: if(
//   global-variable-exists('lscs-theme') and
//     map-has-key($lcds-theme, 'interactive-01'),
//   map-get($lcds-theme, 'interactive-01'),
//   #0f62fe
// );

// $interactive-02: if(
//   global-variable-exists('lscs-theme') and
//     map-has-key($lcds-theme, 'interactive-02'),
//   map-get($lcds-theme, 'interactive-02'),
//   #393939
// );

// $ui-background: if(
//   global-variable-exists('lscs-theme') and
//     map-has-key($lcds-theme, 'ui-background'),
//   map-get($lcds-theme, 'ui-background'),
//   #ffffff
// );

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
