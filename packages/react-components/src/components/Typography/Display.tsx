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
}

export const Display: React.FC<React.PropsWithChildren<IProps>> = ({
  as = 'div',
  size = 'md',
  children,
  className,
  customColor,
  textAlign,
  ...props
}) => {
  return React.createElement(
    as,
    {
      className: cx(styles[`display-${size}`], className),
      style: {
        ...(customColor && { color: customColor }),
        ...(textAlign && { textAlign: textAlign }),
      },
      ...props,
    },
    children
  );
};
