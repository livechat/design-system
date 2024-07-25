import * as React from 'react';

import cx from 'clsx';

import styles from './StatusBadge.module.scss';

const baseClass = 'status-badge';

export type StatusBadgeSizes =
  | '3XS'
  | '2XS'
  | 'XS'
  | 'SM'
  | 'MD'
  | 'LG'
  | 'XL'
  | '2XL'
  | '3XL';

export interface IStatusBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Specify the status badge kind
   */
  kind?: 'offline' | 'accept' | 'not-accept';
  /**
   * Specify the status badge size
   */
  size?: StatusBadgeSizes;
}

export const StatusBadge: React.FC<IStatusBadgeProps> = ({
  className,
  kind = 'offline',
  size = 'MD',
  ...spanProps
}) => {
  const mergedClassNames = cx(
    styles[baseClass],
    styles[`${baseClass}--${kind}`],
    styles[`${baseClass}--${size}`],
    className
  );

  return <span className={mergedClassNames} {...spanProps} />;
};
