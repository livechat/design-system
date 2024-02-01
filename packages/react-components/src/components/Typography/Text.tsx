import * as React from 'react';

import cx from 'clsx';

import styles from './Typography.module.scss';

export type TTextSize = 'md' | 'sm' | 'xs';

interface IProps {
  /** DOM element name that will be rendered */
  as?: string;
  /** Size of the text */
  size?: TTextSize;
  /** Optional custom className */
  className?: string;
  /**
   * @deprecated Use `uppercase` instead
   * Optional prop to set the uppercase
   * */
  caps?: boolean;
  /** Optional prop to set the uppercase */
  uppercase?: boolean;
  /** Optional prop to set the bold */
  bold?: boolean;
  /** Optional prop to set the underline */
  underline?: boolean;
  /** Optional prop to set the strike */
  strike?: boolean;
}

export const Text: React.FC<React.PropsWithChildren<IProps>> = ({
  as = 'p',
  size = 'md',
  caps = false,
  uppercase = false,
  bold = false,
  underline = false,
  strike = false,
  children,
  className,
  ...props
}) => {
  const baseClassPrefix = `paragraph`;

  return React.createElement(
    as,
    {
      className: cx(
        {
          [styles[`${baseClassPrefix}-${size}`]]: true,
          [styles[`${baseClassPrefix}--bold`]]: bold,
          [styles[`${baseClassPrefix}--strike`]]: strike,
          [styles[`${baseClassPrefix}--underline`]]: underline,
          [styles[`${baseClassPrefix}--uppercase`]]: uppercase || caps,
        },
        className
      ),
      ...props,
    },
    children
  );
};
