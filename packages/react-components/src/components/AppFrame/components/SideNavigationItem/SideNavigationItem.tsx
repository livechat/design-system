import * as React from 'react';

import cx from 'clsx';

import noop from '../../../../utils/noop';
import { Text } from '../../../Typography';

import {
  SIDE_NAVIGATION_ACTIVE_ITEM_TEST_ID,
  SIDE_NAVIGATION_ITEM_TEST_ID,
  SIDE_NAVIGATION_PARENT_ICON_TEST_ID,
} from './constants';
import { ISideNavigationItemProps } from './types';

import styles from './SideNavigationItem.module.scss';

const baseClass = 'side-navigation-item';

export const SideNavigationItem: React.FC<ISideNavigationItemProps> = ({
  leftNode,
  shouldKeepIconSpace = true,
  url,
  label,
  className,
  rightNode,
  onClick,
  isActive,
  isMainEntry,
  onItemHover,
  isIconHidden,
  ...props
}) => {
  const isTextLabel = typeof label === 'string';

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault();
    onClick?.();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLAnchorElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onClick?.();
    }
  };

  return (
    <li
      className={cx([styles[baseClass], className])}
      data-testid={
        isActive
          ? SIDE_NAVIGATION_ACTIVE_ITEM_TEST_ID
          : SIDE_NAVIGATION_ITEM_TEST_ID
      }
      data-active={isActive}
      {...props}
    >
      <a
        tabIndex={0}
        className={cx(styles[`${baseClass}__anchor`], {
          [styles[`${baseClass}__anchor--active`]]: isActive,
          [styles[`${baseClass}__anchor--main-entry`]]: isMainEntry,
          [styles[`${baseClass}__anchor--icon-hidden`]]: isIconHidden,
        })}
        href={url}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={onItemHover || noop}
        onFocus={onItemHover || noop}
      >
        {shouldKeepIconSpace && (
          <span
            className={cx(styles[`${baseClass}__left-node`], {
              [styles[`${baseClass}__left-node--active`]]:
                isActive || isMainEntry,
            })}
            data-testid={SIDE_NAVIGATION_PARENT_ICON_TEST_ID}
          >
            {leftNode}
          </span>
        )}
        {isTextLabel ? (
          <Text
            bold={isActive || isMainEntry}
            className={cx(styles[`${baseClass}__label`], {
              [styles[`${baseClass}__label--active`]]: isActive || isMainEntry,
            })}
          >
            {label}
          </Text>
        ) : (
          label
        )}
        {rightNode}
      </a>
    </li>
  );
};
