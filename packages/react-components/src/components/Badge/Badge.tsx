import * as React from 'react';
import cx from 'classnames';

export interface IBadgeProps {
  secondary?: boolean;
  className?: string;
}

export const Badge: React.FC<IBadgeProps> = ({
  children,
  className: extraClassName = '',
  secondary = false,
}) => {
  const className = cx('lc-badge', {
    'lc-badge--secondary': secondary,
    [extraClassName]: !!extraClassName,
  });

  return <span className={className}>{children}</span>;
};
