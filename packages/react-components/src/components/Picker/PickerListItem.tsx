import * as React from 'react';
import cx from 'clsx';
import { Check } from '@livechat/design-system-icons/react/tabler';
import { Icon } from '../Icon';

import styles from './PickerList.module.scss';
import { IPickerListItem } from './types';

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

    return item.name;
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
      })}
      onClick={() => handleOnClick(item)}
    >
      <div className={styles[`${itemClassName}__content`]}>
        {getOptionContent(item)}
      </div>
      {isItemSelected && (
        <Icon
          kind="link"
          source={Check}
          customColor="var(--content-basic-info)"
        />
      )}
    </li>
  );
};
