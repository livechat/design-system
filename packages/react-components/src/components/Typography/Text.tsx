import * as React from 'react';

import cx from 'clsx';

import { TTextAlign, TTextSize } from './types';

import styles from './Typography.module.scss';

interface IProps extends React.HTMLAttributes<HTMLElement> {
  /** DOM element name that will be rendered */
  as?: string;
  /** Size of the text */
  size?: TTextSize;
  /** Optional custom className */
  className?: string;
  /**
   * Optional prop to set the uppercase
   * @deprecated Use `uppercase` instead
   * */
  caps?: boolean;
  /** Optional prop to set the uppercase */
  uppercase?: boolean;
  /** Optional prop to set the bold */
  bold?: boolean;
  /** Optional prop to set the semi-bold */
  semiBold?: boolean;
  /** Optional prop to set the underline */
  underline?: boolean;
  /** Optional prop to set the strike */
  strike?: boolean;
  /** Optional prop to set the custom color */
  customColor?: string;
  /** Optional prop to set the text align */
  textAlign?: TTextAlign;
  /** Optional prop to set the no margin */
  noMargin?: boolean;
}

export const Text: React.FC<React.PropsWithChildren<IProps>> = ({
  as = 'p',
  size = 'md',
  caps = false,
  uppercase = false,
  bold = false,
  semiBold = false,
  underline = false,
  strike = false,
  children,
  className,
  customColor,
  textAlign,
  noMargin,
  ...props
}) => {
  const baseClassPrefix = `paragraph`;

  return React.createElement(
    as,
    {
      className: cx(
        {
          [styles[`${baseClassPrefix}-${size}`]]: true,
          [styles[`${baseClassPrefix}--semi-bold`]]: semiBold && !bold,
          [styles[`${baseClassPrefix}--bold`]]: bold && !semiBold,
          [styles[`${baseClassPrefix}--strike`]]: strike,
          [styles[`${baseClassPrefix}--underline`]]: underline,
          [styles[`${baseClassPrefix}--uppercase`]]: uppercase || caps,
          [styles[`${baseClassPrefix}--no-margin`]]: noMargin,
        },
        className
      ),
      style: {
        ...(customColor && { color: customColor }),
        ...(textAlign && { textAlign: textAlign }),
      },
      ...props,
    },
    children
  );
};
