import { tokens, formatTokenName } from "../src/tokens";
const prettier = require("prettier");

const prettierOptions = {
  parser: 'scss',
  printWidth: 80,
  singleQuote: true,
  trailingComma: 'es5',
  proseWrap: 'always',
};

export function mixinsBuilder(): string {
  const mixinName = 'lcds-theme';
  const defaultThemeName = 'lcds-theme';
  const scssTemplate = tokens.colors.reduce((acc, tokenName) => {
    const token = formatTokenName(tokenName);
    acc += `
      $${token}: map-get($theme, '${token}') !global;
    `;
    return acc;
  }, `
    @mixin ${mixinName}(
      $theme: $${defaultThemeName}
    ) {
  `) + `
      @content;
          
      @if $theme != $${defaultThemeName}{
        @include ${mixinName}();
      }
    }
  `;

  return prettier.format(scssTemplate, prettierOptions)
}

