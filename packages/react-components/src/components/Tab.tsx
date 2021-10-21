import * as React from 'react';
import cx from 'classnames';
import { Text } from './Text';

type HTMLProps =
  | (React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string })
  | (React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: never });

export type ITabProps = HTMLProps & {
  description?: React.ReactNode;
  isSelected?: boolean;
};

const baseClass = 'lc-tab';

export const Tab: React.FC<ITabProps> = ({
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
        baseClass,
        className,
        isSelected && `${baseClass}--selected`
      )}
    >
      {children}
      {description && (
        <Text as="span" size="md" className={`${baseClass}__description`}>
          ({description})
        </Text>
      )}
    </Text>
  );
};
