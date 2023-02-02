import * as React from 'react';
import { Close } from '@livechat/design-system-icons/react/material';
import cx from 'clsx';
import { getContrast } from 'polished';

import { Text } from '../Typography';
import { Icon, IconSize, IconSource } from '../Icon';

import styles from './Tag.module.scss';

const baseClass = 'tag';

export interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
  kind?: 'default' | 'info' | 'warning' | 'success' | 'error';
  size?: 'medium' | 'large';
  iconSize?: IconSize;
  customColor?: string;
  dismissible?: boolean;
  outline?: boolean;
  onRemove?(): void;
  icon?: IconSource;
  avatar?: string;
}

const getCustomTextClass = (customColor?: string) => {
  if (!customColor) {
    return '';
  }
  return getContrast(customColor, '#FFFFFF') > 4.5
    ? 'text-white'
    : 'text-black';
};

export const Tag: React.FC<TagProps> = ({
  className = '',
  children,
  dismissible = false,
  size = 'medium',
  iconSize = 'medium',
  kind = 'default',
  onRemove,
  outline = false,
  icon,
  avatar,
  customColor,
  ...restProps
}) => {
  const mergedClassNames = cx(
    styles[baseClass],
    className,
    styles[`${baseClass}--${size}`],
    styles[`${baseClass}--${kind}`],
    {
      [styles[`${baseClass}--dismissible`]]: dismissible,
      [styles[`${baseClass}--outline`]]: outline,
      [styles[`${baseClass}--with-icon`]]: !!icon || !!avatar,
      [styles[`${baseClass}--${getCustomTextClass(customColor)}`]]:
        !!customColor,
    }
  );

  const getCustomColorStyles = () => {
    if (!customColor) {
      return {};
    }
    if (outline) {
      return {
        style: {
          backgroundColor: 'transparent',
          color: customColor,
          borderColor: customColor,
        },
      };
    }
    return { style: { backgroundColor: customColor } };
  };

  const getIconCustomColor = () => {
    if (!customColor) {
      return undefined;
    }
    if (outline) {
      return customColor;
    }
    return getContrast(customColor, '#FFFFFF') > 4.5 ? '#FFFFFF' : '#000000';
  };

  return (
    <Text
      className={mergedClassNames}
      {...restProps}
      {...getCustomColorStyles()}
      as="div"
      size="md"
    >
      {avatar && (
        <img
          className={styles[`${baseClass}__avatar`]}
          src={avatar}
          alt="tag-avatar"
          data-testid="lc-tag-avatar"
        />
      )}{' '}
      {/*TODO replace with Avatar component*/}
      {icon && !avatar && (
        <Icon
          data-testid="lc-tag-icon"
          className={styles[`${baseClass}__icon`]}
          source={icon}
          size="small"
          customColor={getIconCustomColor()}
        />
      )}
      {children}
      {dismissible && (
        <button
          title="Remove"
          onClick={onRemove}
          type="button"
          className={styles[`${baseClass}__remove`]}
        >
          <Icon
            data-dismiss-icon
            source={Close}
            size={iconSize}
            customColor={getIconCustomColor()}
          />
        </button>
      )}
    </Text>
  );
};
