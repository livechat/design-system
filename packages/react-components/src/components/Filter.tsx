import * as React from 'react';
import cx from 'classnames';
import { Text } from './Text';
import { Close } from '@livechat/design-system-icons/dist/material';
import Icon, { IconSizeName } from './Icon';

const baseClass = 'lc-filter';

export interface IFilterProps extends React.HTMLAttributes<HTMLDivElement> {
  error?: boolean;
  size?: 'medium' | 'large';
  dismissible?: boolean;
  onRemove?(): void;
  // TODO: icon XOR avatar prop
}

export const Filter: React.FC<IFilterProps> = ({
  className = '',
  children,
  dismissible = false,
  size = 'medium',
  error,
  onRemove,
  ...restProps
}) => {
  const mergedClassNames = cx(baseClass, className, `${baseClass}--${size}`, {
    [`${baseClass}--error`]: error,
    [`${baseClass}--dismissible`]: dismissible,
  });

  return (
    <Text className={mergedClassNames} {...restProps} as="div" size="md">
      {children}
      {dismissible && (
        <button
          title="Remove"
          onClick={onRemove}
          type="button"
          className={`${baseClass}__remove`}
        >
          <Icon source={Close} size={IconSizeName.Medium} />
        </button>
      )}
    </Text>
  );
};
