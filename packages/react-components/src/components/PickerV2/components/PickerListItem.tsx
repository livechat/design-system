import * as React from 'react';

import { Check } from '@livechat/design-system-icons';
import { VirtualItem } from '@tanstack/react-virtual';
import cx from 'clsx';

import { Icon } from '../../Icon';
import { IPickerListItem } from '../../Picker';
import { ITEM_GAP_HEIGHT } from '../constants';

import styles from './PickerListItem.module.scss';

interface IPickerListItemProps {
  virtualItem: VirtualItem;
  isActive: boolean;
  isSelected: boolean;
  numberOfItems: number;
  listElementsRef: React.MutableRefObject<(HTMLElement | null)[]>;
  onSelect: (key: string) => void;
  getItemProps: (
    userProps?: React.HTMLProps<HTMLElement> | undefined
  ) => Record<string, unknown>;
  item: IPickerListItem;
}

const itemClassName = `picker-list__item`;

export const PickerListItem: React.FC<IPickerListItemProps> = ({
  virtualItem,
  isActive,
  isSelected,
  listElementsRef,
  onSelect,
  getItemProps,
  item,
  numberOfItems,
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
            checked={isSelected}
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

  if (item.groupHeader) {
    return (
      <div
        id={`item-${virtualItem.index}`}
        key={virtualItem.key}
        role="group"
        className={styles[`${itemClassName}__header`]}
        style={{
          height: `${virtualItem.size}px`,
          transform: `translateY(${virtualItem.start}px)`,
        }}
        {...getItemProps()}
      >
        {item.name}
      </div>
    );
  }

  const handleOnClick = (key: string) => {
    !item.disabled && onSelect(key);
  };

  return (
    <div
      id={`item-${virtualItem.index}`}
      key={virtualItem.key}
      tabIndex={isActive ? 0 : -1}
      ref={(node) => {
        listElementsRef.current[virtualItem.index] = node;
      }}
      role="option"
      aria-selected={isSelected}
      aria-disabled={item.disabled}
      aria-current={isActive}
      aria-setsize={numberOfItems}
      aria-posinset={virtualItem.index + 1}
      className={cx(styles[itemClassName], {
        [styles[`${itemClassName}__custom`]]: item?.customElement,
      })}
      style={{
        height: `${virtualItem.size - ITEM_GAP_HEIGHT}px`,
        transform: `translateY(${virtualItem.start}px)`,
      }}
      {...getItemProps({
        onClick: () => handleOnClick(virtualItem.key.toString()),
      })}
    >
      <div className={styles[`${itemClassName}__content`]}>
        {getOptionContent(item)}
      </div>
      {isSelected && !item.showCheckbox && (
        <Icon
          kind="link"
          source={Check}
          customColor="var(--content-basic-info)"
        />
      )}
    </div>
  );
};
