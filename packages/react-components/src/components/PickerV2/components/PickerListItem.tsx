import * as React from 'react';

import { VirtualItem } from '@tanstack/react-virtual';

import styles from '../Picker.module.scss';

interface IPickerListItemProps {
  virtualItem: VirtualItem;
  activeIndex: number | null;
  selectedIndex: number | null;
  listElementsRef: React.MutableRefObject<(HTMLElement | null)[]>;
  handleSelect: () => void;
  getItemProps: (
    userProps?: React.HTMLProps<HTMLElement> | undefined
  ) => Record<string, unknown>;
}

const ITEMS_COUNT = 35;

export const PickerListItem: React.FC<IPickerListItemProps> = ({
  virtualItem,
  activeIndex,
  selectedIndex,
  listElementsRef,
  handleSelect,
  getItemProps,
}) => {
  return (
    <div
      id={`item-${virtualItem.index}`}
      key={virtualItem.key}
      className={styles['listbox-option']}
      tabIndex={-1}
      ref={(node) => {
        listElementsRef.current[virtualItem.index] = node;
      }}
      role="option"
      aria-selected={activeIndex === virtualItem.index}
      // As the list is virtualized, this lets the assistive tech know
      // how many options there are total without looking at the DOM.
      aria-setsize={ITEMS_COUNT} // TODO
      aria-posinset={virtualItem.index + 1}
      style={{
        height: `${virtualItem.size}px`,
        transform: `translateY(${virtualItem.start}px)`,
        background:
          activeIndex === virtualItem.index ? 'rgba(0, 200, 255, 0.3)' : 'none',
      }}
      {...getItemProps({
        onClick: handleSelect,
      })}
    >
      List item {virtualItem.index + 1}
      <span>{virtualItem.index === selectedIndex ? '✔' : ''}</span>
    </div>
  );
};
