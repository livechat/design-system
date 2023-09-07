import * as React from 'react';

import { Close } from '@livechat/design-system-icons/react/tabler';
import cx from 'clsx';
import { getContrast } from 'polished';

import { Icon, IconSize, IconSource } from '../Icon';
import { Text } from '../Typography';

import styles from './Tag.module.scss';

const baseClass = 'tag';

export interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Specify the tag kind
   */
  kind?:
    | 'default'
    | 'info'
    | 'warning'
    | 'success'
    | 'error'
    | 'purple'
    | 'black';
  /**
   * Specify the tag size
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Specify the tag icon size if used
   */
  iconSize?: IconSize;
  /**
   * Set the tag custom color
   */
  customColor?: string;
  /**
   * Set to show close icon
   */
  dismissible?: boolean;
  /**
   * Outlined version of tag
   */
  outline?: boolean;
  /**
   * The event handler for close icon click
   */
  onRemove?(): void;
  /**
   * Pass the icon to show it on the left
   */
  leftIcon?: IconSource;
  /**
   * Pass the icon to show it on the right
   */
  rightIcon?: IconSource;
  /**
  /**
   * Pass the image source to show it as avatar
   */
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

export const Tag: React.FC<React.PropsWithChildren<TagProps>> = ({
  className = '',
  children,
  dismissible = false,
  size = 'medium',
  iconSize = 'medium',
  kind = 'default',
  onRemove,
  outline = false,
  leftIcon,
  rightIcon,
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
      [styles[`${baseClass}--with-icon`]]: !!leftIcon || !!avatar,
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
      {leftIcon && !avatar && (
        <Icon
          data-testid="lc-tag-left-icon"
          className={styles[`${baseClass}__icon`]}
          source={leftIcon}
          size="small"
          customColor={getIconCustomColor()}
        />
      )}
      {children}
      {rightIcon && (
        <Icon
          data-testid="lc-tag-right-icon"
          className={cx(
            styles[`${baseClass}__icon`],
            styles[`${baseClass}__icon--right`]
          )}
          source={rightIcon}
          size="small"
          customColor={getIconCustomColor()}
        />
      )}
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
