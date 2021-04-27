import { Theme } from './types';

/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// The color token names for a Carbon theme, value corresponds to what they're
// exported as in JavaScript
const colors: Array<keyof Theme> = [
  /**primary button */
  'primaryButtonTextColorDefault',
  'primaryButtonTextColorDisabled',
  'primaryButtonBackgroundColorDefault',
  'primaryButtonBackgroundColorHover',
  'primaryButtonBackgroundColorLoading',
  'primaryButtonBackgroundColorDisabled',
  /**secondary button */
  'secondaryButtonTextColorDefault',
  'secondaryButtonTextColorDisabled',
  'secondaryButtonBackgroundColorDefault',
  'secondaryButtonBackgroundColorHover',
  'secondaryButtonBackgroundColorLoading',
  'secondaryButtonBackgroundColorDisabled',
  'secondaryButtonBorderColorDefault',
  'secondaryButtonBorderColorHover',
  'secondaryButtonBorderColorLoading',
  'secondaryButtonBorderColorDisabled',
  /**basic button */
  'basicButtonTextColorDefault',
  'basicButtonTextColorDisabled',
  'basicButtonBackgroundColorDefault',
  'basicButtonBackgroundColorHover',
  'basicButtonBackgroundColorLoading',
  'basicButtonBackgroundColorDisabled',
  'basicButtonBorderColorDefault',
  'basicButtonBorderColorHover',
  'basicButtonBorderColorLoading',
  'basicButtonBorderColorDisabled',
  /**destructive button */
  'destructiveButtonTextColorDefault',
  'destructiveButtonTextColorDisabled',
  'destructiveButtonBackgroundColorDefault',
  'destructiveButtonBackgroundColorHover',
  'destructiveButtonBackgroundColorLoading',
  'destructiveButtonBackgroundColorDisabled',
  /**checkbox */
  'checkboxColorSelected',
  'checkboxColorDisabled',
  'checkboxBackgroundColorDefault',
  'checkboxBackgroundColorSelected',
  'checkboxBackgroundColorDisabled',
  'checkboxBorderColorDefault',
  'checkboxBorderColorSelected',
  'checkboxBorderColorSelectedDisabled',
  'checkboxBorderColorDisabled',
  /**radio button */
  'radioButtonColorSelected',
  'radioButtonColorDisabled',
  'radioButtonBackgroundColorDefault',
  'radioButtonBackgroundColorSelected',
  'radioButtonBackgroundColorDisabled',
  'radioButtonBorderColorDefault',
  'radioButtonBorderColorSelected',
  'radioButtonBorderColorSelectedDisabled',
  'radioButtonBorderColorDisabled',
  /**switch */
  'switchColorDefault',
  'switchColorDisabled',
  'switchBackgroundColorDefault',
  'switchBackgroundColorSelected',
  'switchBackgroundColorSelectedDisabled',
  'switchBackgroundColorDisabled',
  /**icon */
  'iconColorPrimaryDefault',
  'iconColorPrimaryDisabled',
  'iconColorInvertedDefault',
  'iconColorInvertedDisabled',
  'iconColorLinkDefault',
  'iconColorLinkDisabled',
  'iconColorErrorDefault',
  'iconColorSuccessDefault',
  'iconColorWarningDefault',
  /**ButtonGroup */
  'segmentedControlBackgroundColorDefault',
  'segmentedControlBackgroundColorHover',
  'segmentedControlBackgroundColorSelected',
  'segmentedControlBackgroundColorDisabled',
  'segmentedControlBorderColorDefault',
  'segmentedControlBorderColorHover',
  'segmentedControlBorderColorSelected',
  'segmentedControlBorderColorDisabled',
  /**Font */
  'primaryFontColor',
  'secondaryFontColor',
  'tertiaryFontColor',
  /**Input */
  'inputTextColorDefault',
  'inputBackgroundColorDefault',
  'inputBackgroundColorHover',
  'inputBackgroundColorActive',
  'inputBackgroundColorDisabled',
  'inputBorderColorDefault',
  'inputBorderColorHover',
  'inputBorderColorActive',
  'inputBorderColorDisabled',
  /**Filter */
  'filterTextColor',
  'filterBackgroundColor',
  /**Link */
  'linkColorDefault',
  'linkColorHover',
  /**Toast */
  'toastErrorColor',
  'toastErrorBackgroundColor',
  'toastWarningColor',
  'toastWarningBackgroundColor',
  'toastInfoColor',
  'toastInfoBackgroundColor',
  'toastSuccessColor',
  'toastSuccessBackgroundColor',
  /**Independent */
  'primarySurfaceBackgroundColor',
  'dividerColor',
  'uiBackgroundColorDefault',
  'uiBackgroundColorHover',
  'overlayBackgroundColor',
  'overlayTextColor',
  /**Tooltip */
  'tooltipBackgroundColor',
  'tooltipTextColor',
  'tooltipInvertedBackgroundColor',
  'tooltipInvertedColor',
  'tooltipImportantColor',
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
