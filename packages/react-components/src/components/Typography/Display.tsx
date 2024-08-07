import * as React from 'react';

import cx from 'clsx';

import { TDisplaySize, TTextAlign } from './types';

import styles from './Typography.module.scss';

interface IProps {
  /** Size of the text */
  size?: TDisplaySize;
  /** DOM element name that will be rendered */
  as?: string;
  /** Optional custom className */
  className?: string;
  /** Optional prop to set the custom color */
  customColor?: string;
  /** Optional prop to set the text align */
  textAlign?: TTextAlign;
  /** Optional prop to set the bold */
  bold?: boolean;
}

export const Display: React.FC<React.PropsWithChildren<IProps>> = ({
  as = 'div',
  size = 'md',
  children,
  className,
  customColor,
  textAlign,
  bold = true,
  ...props
}) => {
  return React.createElement(
    as,
    {
      className: cx(
        styles[`display-${size}`],
        {
          [styles['display--bold']]: bold,
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
