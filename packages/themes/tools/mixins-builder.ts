import { tokens, formatTokenName } from "../src/tokens";
const prettier = require("prettier");

const prettierOptions = {
  parser: 'scss',
  printWidth: 80,
  singleQuote: true,
  trailingComma: 'es5',
  proseWrap: 'always',
};

// @mixin lcds-theme(
//   $theme: $lcds-theme
// ) {
//   $interactive-01: map-get($theme, 'interactive-01') !global;
//   $interactive-02: map-get($theme, 'interactive-02') !global;
//   $ui-background: map-get($theme, 'ui-background') !global;

//   @content;

//   // Reset to default theme after apply in content
//   @if $theme != $lcds-theme {
//     @include lcds-theme();
//   }
// }

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

