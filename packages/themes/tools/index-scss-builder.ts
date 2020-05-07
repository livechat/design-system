const prettier = require("prettier");

const prettierOptions = {
  parser: 'scss',
  printWidth: 80,
  singleQuote: true,
  trailingComma: 'es5',
  proseWrap: 'always',
};

export function indexScssBuilder(): string {
  return prettier.format(`
    @import './tokens';
    @import './themes';
    @import './mixins';
  `, prettierOptions)
}
