import * as React from 'react';
import cx from 'classnames';

type TSize = 'md' | 'sm' | 'xs';

interface IProps {
  /** DOM element name that will be rendered */
  as?: string;
  size?: TSize;
  /** Optional custom className */
  className?: string;
  caps?: boolean;
  bold?: boolean;
  underline?: boolean;
  strike?: boolean;
}

export const Text: React.FC<IProps> = ({
  as = 'p',
  size = 'md',
  caps = false,
  bold = false,
  underline = false,
  strike = false,
  children,
  className,
  ...props
}) => {
  const baseClassPrefix = caps ? 'lc-caps' : `lc-paragraph-${size}`;

  return React.createElement(
    as,
    {
      className: cx(
        {
          [`${baseClassPrefix}`]: true,
          [`${baseClassPrefix}--bold`]: bold,
          [`${baseClassPrefix}--strike`]: strike,
          [`${baseClassPrefix}--underline`]: underline,
        },
        className
      ),
      ...props,
    },
    children
  );
};
