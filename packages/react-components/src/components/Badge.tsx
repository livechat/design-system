import * as React from 'react';
import cx from 'classnames';

export interface IBadgeProps {
  children: React.ReactElement;
  secondary: boolean;
  className?: string;
}

const x = 1;

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
