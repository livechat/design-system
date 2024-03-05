import * as React from 'react';

import { Close } from '@livechat/design-system-icons';
import cx from 'clsx';
import { getContrast } from 'polished';

import { Icon } from '../Icon';
import { Text } from '../Typography';

import { TagKind, TagSize } from './types';

import styles from './Tag.module.scss';

const baseClass = 'tag';

export interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Specify the tag kind
   */
  kind?: TagKind;
  /**
   * Specify the tag size
   */
  size?: TagSize;
  /**
   * Set the tag custom color
   */
  customColor?: string;
  /**
   * Set to show close icon
   * @deprecated The close icon will be visible by providing the `onRemove` prop and this flag will no longer be needed
   */
  dismissible?: boolean;
  /**
   * Set to show close icon on hover only if the `onRemove` prop is provided
   */
  dismissibleOnHover?: boolean;
  /**
   * Set to hide close icon if the `onRemove` prop is provided
   */
  disabled?: boolean;
  /**
   * Outlined version of tag
   */
  outline?: boolean;
  /**
   * The event handler for close icon click, if provided the close icon will be visible
   */
  onRemove?(e: React.MouseEvent): void;
  /**
   * React node element to show on the left
   */
  leftNode?: React.ReactElement;
  /**
   * React node element to show on the right
   */
  rightNode?: React.ReactElement;
  /**
   * Set to show the tag as square (only if you want use icon without text)
   */
  iconOnly?: boolean;
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
        <div className={styles[`${baseClass}__content`]}>{children}</div>
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
        <button
          tabIndex={-1}
          title="Remove"
          onClick={onRemove}
          type="button"
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
        </button>
      )}
    </Text>
  );
};
