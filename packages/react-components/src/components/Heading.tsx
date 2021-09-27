import * as React from 'react';
import cx from 'classnames';

enum sizeToElement {
  xl = 'h1',
  l = 'h2',
  m = 'h3',
  s = 'h4',
  xs = 'h5',
}

type TSize = 'xl' | 'l' | 'm' | 's' | 'xs';

interface IProps {
  /** DOM element name that will be rendered */
  as?: string;
  size?: TSize;
  /** Optional custom className */
  className?: string;
}

export const Heading: React.FC<IProps> = ({
  as,
  size = 'l',
  children,
  className,
  ...props
}) => {
  return React.createElement(
    as || sizeToElement[size],
    { className: cx(`lc-h-${size}`, className), ...props },
    children
  );
};
