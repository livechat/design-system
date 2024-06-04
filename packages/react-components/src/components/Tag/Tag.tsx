import * as React from 'react';

import { Close } from '@livechat/design-system-icons';
import cx from 'clsx';
import { getContrast } from 'polished';

import { Icon } from '../Icon';
import { Text } from '../Typography';

import {
  getCustomTextClass,
  getGradientValue,
  isGradientKind,
} from './helpers';
import { TagProps } from './types';

import styles from './Tag.module.scss';

const baseClass = 'tag';

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
  value,
  ...restProps
}) => {
  const isOnHoverCloseButton = dismissibleOnHover || (onRemove && iconOnly);
  const gradientKind = isGradientKind(kind);
  const gradientValue = getGradientValue(kind);
  const mergedClassNames = cx(
    styles[baseClass],
    className,
    styles[`${baseClass}--${size}`],
    styles[`${baseClass}--${kind}`],
    {
      [styles[`${baseClass}--outline`]]: outline,
      [styles[`${baseClass}--${getCustomTextClass(customColor)}`]]:
        !!customColor && !gradientKind,
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

  const getIconCustomColor = (value?: string) => {
    if (value && outline) {
      return value;
    }

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
      {gradientKind && (
        <div className={styles[`${baseClass}--outline-wrapper`]}>
          <div
            className={styles[`${baseClass}--outline-wrapper-inner`]}
            style={{
              backgroundColor: customColor || 'var(--surface-primary-default)',
            }}
          />
        </div>
      )}
      <div className={styles[`${baseClass}__content-wrapper`]}>
        {leftNode && !iconOnly && (
          <div
            data-testid="lc-tag-left-node"
            className={styles[`${baseClass}__node`]}
            style={{ color: getIconCustomColor(gradientValue?.start) }}
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
            style={{ color: getIconCustomColor(gradientValue?.stop) }}
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
            customColor={getIconCustomColor(gradientValue?.stop)}
          />
        </button>
      )}
    </Text>
  );
};
