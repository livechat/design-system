import { themes } from "../src/themes";

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

export function themesBuilder(): string[] {
  return Object.keys(themes).map(themeName => {
    const name = `$lcds-theme--${themeName}`;
    const tokensWithValues = Object.keys(themes[themeName]).map(token => `${token}: ${themes[themeName][token]};`)
    const tokens = tokensWithValues.reduce((acc, t) => {
      acc += `${t}`;
      return acc;
    }, '');

    return `${name}: (
      ${tokens}
    );`;
  });
}
