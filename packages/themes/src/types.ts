export type ThemeName = 'legacy' | 'light';

export interface Theme {
  /**primary button */
  primaryButtonTextColorDefault: string;
  primaryButtonTextColorDisabled: string;
  primaryButtonBackgroundColorDefault: string;
  primaryButtonBackgroundColorHover: string;
  primaryButtonBackgroundColorLoading: string;
  primaryButtonBackgroundColorDisabled: string;
  /**secondary button */
  secondaryButtonTextColorDefault: string;
  secondaryButtonTextColorDisabled: string;
  secondaryButtonBackgroundColorDefault: string;
  secondaryButtonBackgroundColorHover: string;
  secondaryButtonBackgroundColorLoading: string;
  secondaryButtonBackgroundColorDisabled: string;
  secondaryButtonBorderColorDefault: string;
  secondaryButtonBorderColorHover: string;
  secondaryButtonBorderColorLoading: string;
  secondaryButtonBorderColorDisabled: string;
  /**basic button */
  basicButtonTextColorDefault: string;
  basicButtonTextColorDisabled: string;
  basicButtonBackgroundColorDefault: string;
  basicButtonBackgroundColorHover: string;
  basicButtonBackgroundColorLoading: string;
  basicButtonBackgroundColorDisabled: string;
  basicButtonBorderColorDefault: string;
  basicButtonBorderColorHover: string;
  basicButtonBorderColorLoading: string;
  basicButtonBorderColorDisabled: string;
  /**destructive button */
  destructiveButtonTextColorDefault: string;
  destructiveButtonTextColorDisabled: string;
  destructiveButtonBackgroundColorDefault: string;
  destructiveButtonBackgroundColorHover: string;
  destructiveButtonBackgroundColorLoading: string;
  destructiveButtonBackgroundColorDisabled: string;
  /**checkbox */
  checkboxColorSelected: string;
  checkboxColorDisabled: string;
  checkboxBackgroundColorDefault: string;
  checkboxBackgroundColorSelected: string;
  checkboxBackgroundColorDisabled: string;
  checkboxBorderColorDefault: string;
  checkboxBorderColorSelected: string;
  checkboxBorderColorSelectedDisabled: string;
  checkboxBorderColorDisabled: string;
  /**radio button */
  radioButtonColorSelected: string;
  radioButtonColorDisabled: string;
  radioButtonBackgroundColorDefault: string;
  radioButtonBackgroundColorSelected: string;
  radioButtonBackgroundColorDisabled: string;
  radioButtonBorderColorDefault: string;
  radioButtonBorderColorSelected: string;
  radioButtonBorderColorSelectedDisabled: string;
  radioButtonBorderColorDisabled: string;
  /**switch */
  switchColorDefault: string;
  switchColorDisabled: string;
  switchBackgroundColorDefault: string;
  switchBackgroundColorSelected: string;
  switchBackgroundColorSelectedDisabled: string;
  switchBackgroundColorDisabled: string;
  /**icon */
  iconColorPrimaryDefault: string;
  iconColorPrimaryDisabled: string;
  iconColorInvertedDefault: string;
  iconColorInvertedDisabled: string;
  iconColorLinkDefault: string;
  iconColorLinkDisabled: string;
  iconColorErrorDefault: string;
  iconColorSuccessDefault: string;
  iconColorWarningDefault: string;
  /**ButtonGroup */
  segmentedControlBackgroundColorDefault: string;
  segmentedControlBackgroundColorHover: string;
  segmentedControlBackgroundColorSelected: string;
  segmentedControlBackgroundColorDisabled: string;
  segmentedControlBorderColorDefault: string;
  segmentedControlBorderColorHover: string;
  segmentedControlBorderColorSelected: string;
  segmentedControlBorderColorDisabled: string;
  /**Font */
  primaryFontColor: string;
  secondaryFontColor: string;
  tertiaryFontColor: string;
  /**Input */
  inputTextColorDefault: string;
  inputBackgroundColorDefault: string;
  inputBackgroundColorHover: string;
  inputBackgroundColorActive: string;
  inputBackgroundColorDisabled: string;
  inputBorderColorDefault: string;
  inputBorderColorHover: string;
  inputBorderColorActive: string;
  inputBorderColorDisabled: string;
  /**Filter */
  filterTextColor: string;
  filterBackgroundColor: string;
  /**Link */
  linkColorDefault: string;
  linkColorHover: string;
  /**Toast */
  toastErrorColor: string;
  toastErrorBackgroundColor: string;
  toastWarningColor: string;
  toastWarningBackgroundColor: string;
  toastInfoColor: string;
  toastInfoBackgroundColor: string;
  toastSuccessColor: string;
  toastSuccessBackgroundColor: string;
  /**Independent */
  primarySurfaceBackgroundColor: string;
  dividerColor: string;
  uiBackgroundColorDefault: string;
  uiBackgroundColorHover: string;
  overlayBackgroundColor: string;
  overlayTextColor: string;
  /**Tooltip */
  tooltipBackgroundColor: string;
  tooltipTextColor: string;
  tooltipInvertedBackgroundColor: string;
  tooltipInvertedColor: string;
  tooltipImportantBackgroundColor: string;
  tooltipImportantColor: string;
}

export type Themes = Record<ThemeName, Theme>;
