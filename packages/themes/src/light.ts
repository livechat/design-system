/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Colors from '@livechat/design-system-colors';
import { Theme } from './types';

const lightTheme: Theme = {
  /**primary button */
  primaryButtonTextColorDefault: Colors.white,
  primaryButtonTextColorDisabled: Colors.gray400,
  primaryButtonBackgroundColorDefault: Colors.blue500,
  primaryButtonBackgroundColorHover: Colors.blue600,
  primaryButtonBackgroundColorLoading: Colors.blue200,
  primaryButtonBackgroundColorDisabled: Colors.blue100,
  /**secondary button */
  secondaryButtonTextColorDefault: Colors.gray950,
  secondaryButtonTextColorDisabled: Colors.gray200,
  secondaryButtonBackgroundColorDefault: Colors.white,
  secondaryButtonBackgroundColorHover: Colors.gray50,
  secondaryButtonBackgroundColorLoading: Colors.gray75,
  secondaryButtonBackgroundColorDisabled: Colors.white,
  secondaryButtonBorderColorDefault: Colors.gray150,
  secondaryButtonBorderColorHover: Colors.gray150,
  secondaryButtonBorderColorLoading: Colors.gray100,
  secondaryButtonBorderColorDisabled: Colors.gray100,
  /**basic button */
  basicButtonTextColorDefault: Colors.blue500,
  basicButtonTextColorDisabled: Colors.blue200,
  basicButtonBackgroundColorDefault: Colors.white,
  basicButtonBackgroundColorHover: Colors.gray50,
  basicButtonBackgroundColorLoading: Colors.gray75,
  basicButtonBackgroundColorDisabled: Colors.white,
  basicButtonBorderColorDefault: Colors.blue500,
  basicButtonBorderColorHover: Colors.blue500,
  basicButtonBorderColorLoading: Colors.blue500,
  basicButtonBorderColorDisabled: Colors.blue200,
  /**destructive button */
  destructiveButtonTextColorDefault: Colors.white,
  destructiveButtonTextColorDisabled: Colors.white,
  destructiveButtonBackgroundColorDefault: Colors.red600,
  destructiveButtonBackgroundColorHover: Colors.red700,
  destructiveButtonBackgroundColorLoading: Colors.red100,
  destructiveButtonBackgroundColorDisabled: Colors.red100,
  /**checkbox */
  checkboxColorSelected: Colors.white,
  checkboxColorDisabled: Colors.gray50,
  checkboxBackgroundColorDefault: Colors.gray75,
  checkboxBackgroundColorSelected: Colors.blue500,
  checkboxBackgroundColorDisabled: Colors.blue200,
  checkboxBorderColorDefault: Colors.gray150,
  checkboxBorderColorSelected: Colors.blue500,
  checkboxBorderColorSelectedDisabled: Colors.blue200,
  checkboxBorderColorDisabled: Colors.gray100,
  /**radio button */
  radioButtonColorSelected: Colors.white,
  radioButtonColorDisabled: Colors.gray50,
  radioButtonBackgroundColorDefault: Colors.gray75,
  radioButtonBackgroundColorSelected: Colors.blue500,
  radioButtonBackgroundColorDisabled: Colors.blue200,
  radioButtonBorderColorDefault: Colors.gray150,
  radioButtonBorderColorSelected: Colors.blue500,
  radioButtonBorderColorSelectedDisabled: Colors.blue200,
  radioButtonBorderColorDisabled: Colors.gray100,
  /**switch */
  switchColorDefault: Colors.white,
  switchColorDisabled: Colors.gray100,
  switchBackgroundColorDefault: Colors.gray150,
  switchBackgroundColorSelected: Colors.green500,
  switchBackgroundColorSelectedDisabled: Colors.green200,
  switchBackgroundColorDisabled: Colors.gray50,
  /**icon */
  iconColorPrimaryDefault: Colors.gray950,
  iconColorPrimaryDisabled: Colors.gray400,
  iconColorInvertedDefault: Colors.white,
  iconColorInvertedDisabled: Colors.gray100,
  iconColorLinkDefault: Colors.blue500,
  iconColorLinkDisabled: Colors.blue100,
  iconColorErrorDefault: Colors.red600,
  iconColorSuccessDefault: Colors.green500,
  iconColorWarningDefault: Colors.yellow300,
  /**ButtonGroup */
  segmentedControlBackgroundColorDefault: Colors.white,
  segmentedControlBackgroundColorHover: Colors.gray50,
  segmentedControlBackgroundColorSelected: Colors.gray100,
  segmentedControlBackgroundColorDisabled: Colors.white,
  segmentedControlBorderColorDefault: Colors.gray200,
  segmentedControlBorderColorHover: Colors.gray200,
  segmentedControlBorderColorSelected: Colors.gray200,
  segmentedControlBorderColorDisabled: Colors.gray100,
  /**Font */
  primaryFontColor: Colors.gray950,
  secondaryFontColor: Colors.gray600,
  tertiaryFontColor: Colors.gray400,
  /**Input */
  inputTextColorDefault: Colors.gray950,
  inputBackgroundColorDefault: Colors.white,
  inputBackgroundColorHover: Colors.white,
  inputBackgroundColorActive: Colors.white,
  inputBackgroundColorDisabled: Colors.gray75,
  inputBorderColorDefault: Colors.gray150,
  inputBorderColorHover: Colors.gray200,
  inputBorderColorActive: Colors.blue500,
  inputBorderColorDisabled: Colors.gray75,
  /**Filter */
  filterBackgroundColor: Colors.blue900,
  filterTextColor: Colors.white,
  /**Link */
  linkColorDefault: Colors.blue500,
  linkColorHover: Colors.blue600,
  /**Toast */
  toastErrorColor: Colors.white,
  toastErrorBackgroundColor: Colors.red600,
  toastWarningColor: Colors.yellow900,
  toastWarningBackgroundColor: Colors.yellow300,
  toastInfoColor: Colors.white,
  toastInfoBackgroundColor: Colors.blue300,
  toastSuccessColor: Colors.white,
  toastSuccessBackgroundColor: Colors.green500,
  /**Independent */
  primarySurfaceBackgroundColor: Colors.white,
  dividerColor: Colors.gray75,
  uiBackgroundColorDefault: Colors.gray50,
  uiBackgroundColorHover: Colors.gray75,
  overlayBackgroundColor: Colors.gray950,
  overlayTextColor: Colors.white,
  /**Tooltip */
  tooltipBackgroundColor: Colors.gray800,
  tooltipTextColor: Colors.white,
  tooltipInvertedBackgroundColor: Colors.white,
  tooltipInvertedColor: Colors.gray800,
  tooltipImportantBackgroundColor: Colors.yellow300,
  tooltipImportantColor: Colors.gray800,
};

export default lightTheme;
