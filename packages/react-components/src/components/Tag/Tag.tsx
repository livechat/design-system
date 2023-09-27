import * as React from 'react';

import { Icon, IconSize } from '@livechat/design-system-icons';
import cx from 'clsx';
import { getContrast } from 'polished';

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
   * React node element to show on the left
   */
  leftNode?: React.ReactElement;
  /**
   * React node element to show on the right
   */
  rightNode?: React.ReactElement;
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
  leftNode,
  rightNode,
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
      [styles[`${baseClass}--with-node`]]: !!leftNode || !!rightNode,
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
      {leftNode && (
        <div
          data-testid="lc-tag-left-node"
          className={styles[`${baseClass}__node`]}
          style={{ color: getIconCustomColor() }}
        >
          {leftNode}
        </div>
      )}
      <div className={styles[`${baseClass}__content`]}>{children}</div>
      {rightNode && (
        <div
          data-testid="lc-tag-right-node"
          className={cx(styles[`${baseClass}__node--right`])}
          style={{ color: getIconCustomColor() }}
        >
          {rightNode}
        </div>
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
            set="tabler"
            name="Close"
            size={iconSize}
            customColor={getIconCustomColor()}
          />
        </button>
      )}
    </Text>
  );
};
