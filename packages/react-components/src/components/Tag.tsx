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
  icon?: React.FC<React.SVGProps<SVGSVGElement>> | string;
  avatar?: string;
}

export const Tag: React.FC<ITagProps> = ({
  className = '',
  children,
  dismissible = false,
  size = 'medium',
  kind = 'default',
  onRemove,
  outline = false,
  icon,
  avatar,
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
      [`${baseClass}--with-icon`]: !!icon || !!avatar,
    }
  );

  return (
    <Text className={mergedClassNames} {...restProps} as="div" size="md">
      {avatar && (
        <img className={`${baseClass}__avatar`} src={avatar} alt="tag-avatar" />
      )}{' '}
      {/*TODO replace with Avatar component*/}
      {icon && !avatar && (
        <Icon
          className={`${baseClass}__icon`}
          source={icon}
          size={IconSizeName.Small}
        />
      )}
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
