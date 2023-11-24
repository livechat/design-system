import * as React from 'react';

import { Check } from '@livechat/design-system-icons';
import { VirtualItem } from '@tanstack/react-virtual';
import cx from 'clsx';

import { Icon } from '../../Icon';
import { IPickerListItem } from '../../Picker';

import styles from './PickerListItem.module.scss';

interface IPickerListItemProps {
  virtualItem: VirtualItem;
  isActive: boolean;
  isSelected: boolean;
  listElementsRef: React.MutableRefObject<(HTMLElement | null)[]>;
  handleSelect: (index: number) => void;
  getItemProps: (
    userProps?: React.HTMLProps<HTMLElement> | undefined
  ) => Record<string, unknown>;
  item: IPickerListItem;
}

const ITEMS_COUNT = 7;
const itemClassName = `picker-list__item`;

export const PickerListItem: React.FC<IPickerListItemProps> = ({
  virtualItem,
  isActive,
  isSelected,
  listElementsRef,
  handleSelect,
  getItemProps,
  item,
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
          height: `${virtualItem.size}px`, // 2px gap between items
          transform: `translateY(${virtualItem.start}px)`,
        }}
        {...getItemProps()}
      >
        {item.name}
      </div>
    );
  }

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
      aria-current={isActive}
      aria-setsize={ITEMS_COUNT} // TODO
      aria-posinset={virtualItem.index + 1}
      style={{
        height: `${virtualItem.size - 2}px`, // 2px gap between items
        transform: `translateY(${virtualItem.start}px)`,
      }}
      className={cx(styles[itemClassName], {
        [styles[`${itemClassName}__custom`]]: item?.customElement,
      })}
      {...getItemProps({
        onClick: () => handleSelect(virtualItem.index),
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
