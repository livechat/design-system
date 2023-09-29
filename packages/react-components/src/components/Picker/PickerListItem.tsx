import * as React from 'react';

import { Icon, TablerIcon } from '@livechat/design-system-icons';
import cx from 'clsx';

import { IPickerListItem } from './types';

import styles from './PickerList.module.scss';

const itemClassName = `picker-list__item`;

interface IProps {
  item: IPickerListItem;
  isItemSelected: boolean;
  currentItemKey: string | null;
  isAdjacentStyleApplied: 'top' | 'middle' | 'bottom';
  onSelect: (item: IPickerListItem) => void;
}

export const PickerListItem: React.FC<IProps> = ({
  item,
  isItemSelected,
  currentItemKey,
  isAdjacentStyleApplied,
  onSelect,
}) => {
  const getOptionContent = (item: IPickerListItem) => {
    if (item?.customElement) {
      return (
        <div className={styles[`${itemClassName}__custom`]}>
          {item.customElement.listItemBody}
        </div>
      );
    }

    return (
      <>
        {item.showCheckbox && (
          <input
            type="checkbox"
            className={styles[`${itemClassName}__checkbox`]}
            checked={isItemSelected}
          />
        )}
        {item.icon && (
          <Icon
            className={styles[`${itemClassName}__icon`]}
            kind="link"
            set="tabler"
            name={item.icon as TablerIcon}
          />
        )}
        {item.avatarSrc && (
          <img
            className={cx(styles[`${itemClassName}__avatar`])}
            src={item.avatarSrc}
            alt={item.name}
          />
        )}
        <div className={styles[`${itemClassName}__label-container`]}>
          <span
            className={cx({
              [styles[`${itemClassName}__main-label`]]: item.secondaryText,
            })}
          >
            {item.name}
          </span>
          {item.secondaryText && (
            <span className={styles[`${itemClassName}__secondary-label`]}>
              {item.secondaryText}
            </span>
          )}
        </div>
      </>
    );
  };

  const handleOnClick = (item: IPickerListItem) => {
    !item.disabled && onSelect(item);
  };

  if (item.groupHeader) {
    return (
      <li
        role="option"
        key={item.key}
        className={styles[`${itemClassName}__header`]}
      >
        {item.name}
      </li>
    );
  }

  return (
    <li
      data-testid={item.key}
      ref={(element) => {
        if (currentItemKey === item.key) {
          element?.scrollIntoView({ block: 'nearest' });
        }
      }}
      role="option"
      aria-current={currentItemKey === item.key}
      aria-selected={isItemSelected}
      aria-disabled={item.disabled}
      id={item.key}
      key={item.key}
      data-adjacent={isAdjacentStyleApplied}
      className={cx(styles[itemClassName], {
        [styles[`${itemClassName}__custom`]]: item?.customElement,
      })}
      onClick={() => handleOnClick(item)}
    >
      <div className={styles[`${itemClassName}__content`]}>
        {getOptionContent(item)}
      </div>
      {isItemSelected && !item.showCheckbox && (
        <Icon
          kind="link"
          set="tabler"
          name="Check"
          customColor="var(--content-basic-info)"
        />
      )}
    </li>
  );
};
