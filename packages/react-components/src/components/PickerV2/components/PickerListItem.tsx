import * as React from 'react';

import { VirtualItem } from '@tanstack/react-virtual';
import cx from 'clsx';

import { IPickerListItem } from '../../Picker';

import styles from './PickerListItem.module.scss';

interface IPickerListItemProps {
  virtualItem: VirtualItem;
  activeIndex: number | null;
  selectedIndices: number[];
  listElementsRef: React.MutableRefObject<(HTMLElement | null)[]>;
  handleSelect: () => void;
  getItemProps: (
    userProps?: React.HTMLProps<HTMLElement> | undefined
  ) => Record<string, unknown>;
  item: IPickerListItem;
}

const ITEMS_COUNT = 7;
const itemClassName = `picker-list__item`;

export const PickerListItem: React.FC<IPickerListItemProps> = ({
  virtualItem,
  activeIndex,
  selectedIndices,
  listElementsRef,
  handleSelect,
  getItemProps,
  item,
}) => {
  const isSelected = selectedIndices.includes(virtualItem.index);
  const isActive = activeIndex === virtualItem.index;

  return (
    <div
      id={`item-${virtualItem.index}`}
      key={virtualItem.key}
      tabIndex={-1}
      ref={(node) => {
        listElementsRef.current[virtualItem.index] = node;
      }}
      role="option"
      aria-selected={isSelected}
      aria-current={isActive}
      aria-setsize={ITEMS_COUNT} // TODO
      aria-posinset={virtualItem.index + 1}
      style={{
        height: `${virtualItem.size}px`,
        transform: `translateY(${virtualItem.start}px)`,
        background:
          activeIndex === virtualItem.index ? 'rgba(0, 200, 255, 0.3)' : 'none',
      }}
      className={cx(styles[itemClassName], {
        [styles[`${itemClassName}__custom`]]: item?.customElement,
      })}
      {...getItemProps({
        onClick: handleSelect,
      })}
    >
      List item {virtualItem.index + 1}
      <span>{isSelected ? '✔' : ''}</span>
    </div>
  );
};
