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
        className={cx(styles[`${baseClass}__anchor`], {
          [styles[`${baseClass}__anchor--active`]]: isActive,
          [styles[`${baseClass}__anchor--main-entry`]]: isMainEntry,
          [styles[`${baseClass}__anchor--icon-hidden`]]: isIconHidden,
        })}
        type="button"
        href={url}
        onClick={handleClick}
        onMouseEnter={onItemHover || noop}
      >
        {shouldKeepIconSpace && (
          <span
            className={cx(styles[`${baseClass}__left-node`], {
              [styles[`${baseClass}__left-node--active`]]: isActive,
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
