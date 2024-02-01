import * as React from 'react';

import cx from 'clsx';

import styles from './Typography.module.scss';

export type TDisplaySize = 'sm' | 'md' | 'max';

interface IProps {
  /** Size of the text */
  size?: TDisplaySize;
  /** DOM element name that will be rendered */
  as?: string;
  /** Optional custom className */
  className?: string;
}

export const Display: React.FC<React.PropsWithChildren<IProps>> = ({
  as = 'div',
  size = 'md',
  children,
  className,
  ...props
}) => {
  return React.createElement(
    as,
    { className: cx(styles[`display-${size}`], className), ...props },
    children
  );
};
