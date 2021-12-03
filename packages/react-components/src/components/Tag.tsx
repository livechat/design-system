import * as React from 'react';
import cx from 'classnames';
import { Text } from './Text';
import { Close } from '@livechat/design-system-icons/dist/material';
import Icon, { IconSizeName } from './Icon';

const baseClass = 'lc-tag';

export interface ITagProps extends React.HTMLAttributes<HTMLDivElement> {
  kind?: 'default' | 'info' | 'warning' | 'success' | 'error';
  size?: 'medium' | 'large';
  dismissible?: boolean;
  outline?: boolean;
  onRemove?(): void;
  // TODO: icon XOR avatar prop
}

export const Tag: React.FC<ITagProps> = ({
  className = '',
  children,
  dismissible = false,
  size = 'medium',
  kind = 'default',
  onRemove,
  outline = false,
  ...restProps
}) => {
  const mergedClassNames = cx(
    baseClass,
    className,
    `${baseClass}--${size}`,
    `${baseClass}--${kind}`,
    {
      [`${baseClass}--dismissible`]: dismissible,
      [`${baseClass}--outline`]: outline,
    }
  );

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
