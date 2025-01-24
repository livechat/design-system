import * as React from 'react';

export interface IInputIcon {
  source: React.ReactElement;
  place: 'left' | 'right';
}

export interface IInputGlobalProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Specify whether the input should be in error state
   */
  error?: boolean;
  /**
   * Specify whether the input should be disabled
   */
  disabled?: boolean;
  /**
   * Set the icon and its position
   */
  icon?: IInputIcon;
  /**
   * Set to enable ellipsis
   */
  cropOnBlur?: boolean;
  /**
   * Set the text to display with read-only state when there is no data. Default to 'No data'
   */
  noDataFallbackText?: string;
}

export interface IInputProps extends IInputGlobalProps {
  /**
   * Specify the input size
   */
  inputSize?: 'xsmall' | 'compact' | 'medium' | 'large';
}

export interface IInputPromoProps extends IInputGlobalProps {}

export interface IInputComponentProps extends IInputGlobalProps {
  /**
   * CSS class name for the main input wrapper
   */
  mainClassName: string;
  /**
   * Set to display promo input
   */
  isPromo?: boolean;
}
