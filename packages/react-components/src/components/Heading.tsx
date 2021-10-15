import * as React from 'react';
import cx from 'classnames';

enum sizeToElement {
  xl = 'h1',
  lg = 'h2',
  md = 'h3',
  sm = 'h4',
  xs = 'h5',
}

type TSize = 'xl' | 'lg' | 'md' | 'sm' | 'xs';

interface IProps {
  size?: TSize;
  /** DOM element name that will be rendered */
  as?: string;
  /** Optional custom className */
  className?: string;
}

export const Heading: React.FC<IProps> = ({
  as,
  size = 'md',
  children,
  className,
  ...props
}) => {
  return React.createElement(
    as || sizeToElement[size],
    { className: cx(`lc-heading-${size}`, className), ...props },
    children
  );
};
