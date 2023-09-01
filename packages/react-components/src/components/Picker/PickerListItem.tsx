import * as React from 'react';

import { Check } from '@livechat/design-system-icons/react/tabler';
import cx from 'clsx';

import { Icon } from '../Icon';

import { IPickerListItem } from './types';

import styles from './PickerList.module.scss';

const itemClassName = `picker-list__item`;

interface IProps {
  item: IPickerListItem;
  isItemSelected: boolean;
  currentItemKey: string | null;
  onSelect: (item: IPickerListItem) => void;
}

export const PickerListItem: React.FC<IProps> = ({
  item,
  isItemSelected,
  currentItemKey,
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
            source={item.icon}
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
      className={cx(styles[itemClassName], {
        [styles[`${itemClassName}__custom`]]: item?.customElement,
        [styles[`${itemClassName}--two-line`]]: item.secondaryText,
      })}
      onClick={() => handleOnClick(item)}
    >
      <div className={styles[`${itemClassName}__content`]}>
        {getOptionContent(item)}
      </div>
      {isItemSelected && !item.showCheckbox && (
        <Icon
          kind="link"
          source={Check}
          customColor="var(--content-basic-info)"
        />
      )}
    </li>
  );
};
