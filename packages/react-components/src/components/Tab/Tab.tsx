import * as React from 'react';
import cx from 'clsx';
import { Text } from '../Typography';

import styles from './Tab.module.scss';

type HTMLProps =
  | (React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string })
  | (React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: never });

export type TabProps = HTMLProps & {
  description?: React.ReactNode;
  isSelected?: boolean;
};

const baseClass = 'tab';

export const Tab: React.FC<TabProps> = ({
  children,
  className,
  description,
  isSelected,
  ...restProps
}) => {
  return (
    <Text
      {...restProps}
      as={restProps.href ? 'a' : 'button'}
      size="md"
      bold={isSelected}
      className={cx(
        styles[baseClass],
        className,
        isSelected && styles[`${baseClass}--selected`]
      )}
    >
      {children}
      {description && (
        <Text
          as="span"
          size="md"
          className={styles[`${baseClass}__description`]}
        >
          ({description})
        </Text>
      )}
    </Text>
  );
};
