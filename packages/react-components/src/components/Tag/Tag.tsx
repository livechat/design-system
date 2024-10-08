import * as React from 'react';

import { Close } from '@livechat/design-system-icons';
import cx from 'clsx';
import { getContrast } from 'polished';

import { Icon } from '../Icon';
import { Text } from '../Typography';

import { TagProps } from './types';

import styles from './Tag.module.scss';

const baseClass = 'tag';

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
  dismissibleOnHover = false,
  disabled = false,
  size = 'medium',
  kind = 'default',
  onRemove,
  outline = false,
  leftNode,
  rightNode,
  customColor,
  iconOnly = false,
  value,
  ...restProps
}) => {
  const isOnHoverCloseButton = dismissibleOnHover || (onRemove && iconOnly);
  const mergedClassNames = cx(
    styles[baseClass],
    className,
    styles[`${baseClass}--${size}`],
    styles[`${baseClass}--${kind}`],
    {
      [styles[`${baseClass}--outline`]]: outline,
      [styles[`${baseClass}--${getCustomTextClass(customColor)}`]]:
        !!customColor,
      [styles[`${baseClass}--icon-only`]]: iconOnly,
      [styles[`${baseClass}--dismissible-on-hover`]]: isOnHoverCloseButton,
    }
  );
  const closeIconSize = size === 'small' ? 'small' : 'medium';
  const textSize = size === 'small' ? 'sm' : 'md';

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
      size={textSize}
    >
      <div className={styles[`${baseClass}__content-wrapper`]}>
        {leftNode && !iconOnly && (
          <div
            data-testid="lc-tag-left-node"
            className={styles[`${baseClass}__node`]}
            style={{ color: getIconCustomColor() }}
          >
            {leftNode}
          </div>
        )}
        <div className={styles[`${baseClass}__content`]}>
          {value || children}
        </div>
        {rightNode && !iconOnly && (
          <div
            data-testid="lc-tag-right-node"
            className={styles[`${baseClass}__node`]}
            style={{ color: getIconCustomColor() }}
          >
            {rightNode}
          </div>
        )}
      </div>
      {onRemove && !disabled && (
        <span
          tabIndex={-1}
          title="Remove"
          onClick={onRemove}
          role="button"
          aria-label="Remove tag"
          className={cx(styles[`${baseClass}__remove`], {
            [styles[`${baseClass}__remove--hover`]]: isOnHoverCloseButton,
          })}
        >
          <Icon
            data-dismiss-icon
            source={Close}
            size={closeIconSize}
            customColor={getIconCustomColor()}
          />
        </span>
      )}
    </Text>
  );
};
