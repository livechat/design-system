import * as React from 'react';

import { Close } from '@livechat/design-system-icons';
import cx from 'clsx';

import { Icon } from '../Icon';
import { Tooltip } from '../Tooltip';
import { Text } from '../Typography';

import {
  getCustomColorStyles,
  getCustomTextClass,
  getIconCustomColor,
} from './helpers';
import { useIsOverflow } from './hooks/use-is-overflow';

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
  size?: 'small' | 'medium' | 'large' | 'xlarge';
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
   * Set to show full content tooltip when a text is overflowed
   */
  showFullContentTooltip?: boolean;
}

export const Tag: React.FC<React.PropsWithChildren<TagProps>> = ({
  className = '',
  children,
  dismissible = false,
  size = 'medium',
  kind = 'default',
  onRemove,
  outline = false,
  leftNode,
  rightNode,
  customColor,
  showFullContentTooltip = true,
  ...restProps
}) => {
  const textRef = React.useRef<HTMLDivElement>(null);
  const isTextOverflow = useIsOverflow(
    textRef as React.MutableRefObject<HTMLElement>
  );
  const mergedClassNames = cx(
    styles[baseClass],
    className,
    styles[`${baseClass}--${size}`],
    styles[`${baseClass}--${kind}`],
    {
      [styles[`${baseClass}--dismissible`]]: dismissible,
      [styles[`${baseClass}--outline`]]: outline,
      [styles[`${baseClass}--${getCustomTextClass(customColor)}`]]:
        !!customColor,
    }
  );
  const iconCustomColor = getIconCustomColor(customColor, outline);
  const iconCustomColorStyles = { color: iconCustomColor };
  const closeIconSize = size === 'small' ? 'small' : 'medium';

  return (
    <Text
      className={mergedClassNames}
      {...restProps}
      {...getCustomColorStyles(customColor, outline)}
      as="div"
      size="md"
    >
      {leftNode && (
        <div
          data-testid="lc-tag-left-node"
          className={styles[`${baseClass}__node`]}
          style={iconCustomColorStyles}
        >
          {leftNode}
        </div>
      )}
      <div ref={textRef} className={styles[`${baseClass}__content`]}>
        {(!isTextOverflow || !showFullContentTooltip) && children}
        {isTextOverflow && showFullContentTooltip && (
          <Tooltip
            triggerRenderer={() => (
              <div className={styles[`${baseClass}__tooltip`]}>{children}</div>
            )}
            theme="invert"
          >
            {children}
          </Tooltip>
        )}
      </div>
      {rightNode && (
        <div
          data-testid="lc-tag-right-node"
          className={cx(styles[`${baseClass}__node--right`])}
          style={iconCustomColorStyles}
        >
          {rightNode}
        </div>
      )}
      {dismissible && (
        <button
          tabIndex={-1}
          title="Remove"
          onClick={onRemove}
          type="button"
          aria-label="Remove tag"
          className={styles[`${baseClass}__remove`]}
        >
          <Icon
            data-dismiss-icon
            source={Close}
            size={closeIconSize}
            customColor={iconCustomColor}
          />
        </button>
      )}
    </Text>
  );
};
