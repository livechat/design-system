import { themes } from "../src/themes";
const prettier = require("prettier");

const prettierOptions = {
  parser: 'json',
  printWidth: 80,
  singleQuote: true,
  trailingComma: 'es5',
  proseWrap: 'always',
};

// {
//   "light": {
//     "interactive01": "..."
//   },
//   ...
// }

export function jsonBuilder(): string {
  return prettier.format(JSON.stringify(themes), prettierOptions)
}

