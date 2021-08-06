import { Theme } from './types';

const colors: Array<keyof Theme> = [
  // Background
  'background',
  // Surface
  'surfaceBasicDefault',
  'surfaceBasicSubtle',
  'surfaceBasicHover',
  'surfaceBasicActive',
  'surfaceBasicDisabled',
  'surfaceSecondaryDefault',
  'surfaceSecondarySubtle',
  'surfaceSecondaryHover',
  'surfaceSecondaryDisabled',
  'surfaceFeedbackInfo',
  'surfaceFeedbackNegative',
  'surfaceFeedbackWarning',
  'surfaceFeedbackPositive',
  'surfaceInvertDefault',
  'surfaceInvertSubtle',
  'surfaceInvertDisabled',
  'surfaceOverlay',
  // Content
  'contentDefault',
  'contentSubtle',
  'contentDisabled',
  'contentWhiteLocked',
  'contentInvertDefault',
  'contentInvertSubtle',
  'contentInvertDisabled',
  // Border
  'borderDefault',
  'borderSubtle',
  'borderHover',
  'borderDisabled',
  'borderInvertDefault',
  'borderInvertSubtle',
  'borderInvertHover',
  'borderInvertDisabled',
  // Accent colors
  'colorActionActive',
  'colorActionHover',
  'colorActionDefault',
  'colorActionDisabled',
  'colorNegativeActive',
  'colorNegativeHover',
  'colorNegativeDefault',
  'colorNegativeDisabled',
  'colorWarningDefault',
  'colorWarningHover',
  'colorPositiveDefault',
  'colorPositiveHover',
  'colorPositiveDisabled',
  'colorFilter',
  'colorBot',
];

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

/**
 * Format a given token into the format expected in CSS/SCSS-based projects.
 * @param {string} token
 * @returns {string}
 */
export function formatTokenName(token: any) {
  let string = '';

  /* eslint-disable no-continue */
  for (let i = 0; i < token.length; i += 1) {
    // If we run into a number, we hit the scale step at the end of a token name
    // and can safely truncate the rest of the token
    if (numbers.indexOf(token[i]) !== -1) {
      string += `-${token.slice(i)}`;
      break;
    }

    // When encountering an uppercase name, we will want to start adding `-`
    // between words
    if (token[i] === token[i].toUpperCase()) {
      // Check backwards to see if previous letter was also capitalized, if so
      // we are in a special case like UI where each piece should be connected
      if (token[i - 1] && token[i - 1] === token[i - 1].toUpperCase()) {
        string += token[i].toLowerCase();
        continue;
      }

      // Otherwise, just concatenate this new part on to the existing string
      string += `-${token[i].toLowerCase()}`;
      continue;
    }

    // By default, we add the current character to the output string
    string += token[i];
  }

  return string;
}

export const tokens = {
  colors,
};
