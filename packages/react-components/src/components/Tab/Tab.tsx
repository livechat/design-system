import * as React from 'react';

import cx from 'clsx';

import { Size } from '../../utils';
import { Badge } from '../Badge';
import { Text } from '../Typography';

import styles from './Tab.module.scss';

type HTMLProps =
  | (React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string })
  | (React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: never });

export type TabProps = HTMLProps & {
  count?: number;
  isSelected?: boolean;
  asBadge?: boolean;
  size?: Size;
};

const baseClass = 'tab';

export const Tab: React.FC<React.PropsWithChildren<TabProps>> = ({
  children,
  className,
  count,
  isSelected,
  asBadge,
  size = 'medium',
  ...restProps
}) => {
  const { disabled } =
    restProps as React.ButtonHTMLAttributes<HTMLButtonElement>;
  const shouldDisplayAsCounter = count !== undefined && !asBadge;
  const shouldDisplayAsBadge = count !== undefined && asBadge;

  return (
    <Text
      {...restProps}
      as={restProps.href ? 'a' : 'button'}
      size="md"
      bold={isSelected}
      className={cx(
        className,
        styles[baseClass],
        styles[`${baseClass}--${size}`],
        isSelected && styles[`${baseClass}--selected`],
        disabled && styles[`${baseClass}--disabled`]
      )}
    >
      {children}
      {shouldDisplayAsCounter && (
        <Text as="span" size="md" className={styles[`${baseClass}__count`]}>
          ({count})
        </Text>
      )}
      {shouldDisplayAsBadge && (
        <Badge
          data-testid="tab-badge"
          count={count}
          size="compact"
          className={styles[`${baseClass}__badge`]}
        />
      )}
    </Text>
  );
};
