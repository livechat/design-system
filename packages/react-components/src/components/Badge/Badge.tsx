import * as React from 'react';

import styles from './Badge.module.scss';
import cx from 'clsx';

const baseClass = 'badge';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  kind?: 'primary' | 'secondary' | 'tertiary';
  size?: 'large' | 'medium' | 'compact';
  type?: 'content' | 'alert' | 'dot';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  kind = 'primary',
  size = 'medium',
  type = 'content',
}) => {
  const mergedClassNames = cx(
    className,
    styles[baseClass],
    styles[`${baseClass}--${kind}`],
    styles[`${baseClass}--${size}`]
  );

  const content = {
    ['content']: children,
    ['alert']: '!',
    ['dot']: <span className={styles[`${baseClass}__dot`]} />,
  }[type];

  return <span className={mergedClassNames}>{content}</span>;
};
