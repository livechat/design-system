import * as React from 'react';

import { FloatingFocusManager, FloatingContext } from '@floating-ui/react';
import { useVirtualizer } from '@tanstack/react-virtual';
import cx from 'clsx';

import { ITEM_HEIGHT } from '../constants';
import { IPickerListItem } from '../types';

import { PickerListItem } from './PickerListItem';

import styles from './PickerList.module.scss';

interface IPickerListProps {
  options: IPickerListItem[];
  context: FloatingContext<HTMLButtonElement>;
  setFloating: (node: HTMLElement | null) => void;
  floatingStyles: React.CSSProperties;
  maxHeight: number;
  floatingRef: React.MutableRefObject<HTMLElement | null>;
  listElementsRef: React.MutableRefObject<(HTMLElement | null)[]>;
  isPositioned: boolean;
  pointer: boolean;
  activeIndex: number | null;
  selectedKeys: string[];
  setPointer: (pointer: boolean) => void;
  handleSelect: (key: string) => void;
  getFloatingProps: (
    userProps?: React.HTMLProps<HTMLElement> | undefined
  ) => Record<string, unknown>;
  getItemProps: (
    userProps?: React.HTMLProps<HTMLElement> | undefined
  ) => Record<string, unknown>;
  emptyStateText?: string;
  selectAllOptionText?: string;
}

const baseClass = 'picker-list';

export const PickerList: React.FC<IPickerListProps> = ({
  context,
  setFloating,
  floatingStyles,
  maxHeight,
  options,
  floatingRef,
  isPositioned,
  pointer,
  activeIndex,
  selectedKeys,
  listElementsRef,
  setPointer,
  handleSelect,
  getFloatingProps,
  getItemProps,
  emptyStateText,
  // selectAllOptionText,
}) => {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const numberOfItems = options.length;

  const mergedClassNames = cx(styles[baseClass], {
    [styles[`${baseClass}__no-results`]]: options.length === 0,
  });

  const rowVirtualizer = useVirtualizer({
    count: options.length,
    getScrollElement: () => floatingRef.current,
    estimateSize: () => ITEM_HEIGHT, // TODO for a custom element, we need to get the height of the custom element
    overscan: 5,
    getItemKey: (index) => options[index].key,
  });

  React.useLayoutEffect(() => {
    if (isPositioned && !pointer) {
      // Nothing has been selected, reset scrolling upon open
      if (activeIndex === null && selectedKeys.length === 0) {
        rowVirtualizer.scrollToIndex(0);
      }

      // Scrolling is restored, but the item will be scrolled
      // into view when necessary
      if (activeIndex !== null) {
        wrapperRef.current?.focus({ preventScroll: true });
        rowVirtualizer.scrollToIndex(activeIndex);
      }
    }
  }, [rowVirtualizer, isPositioned, activeIndex, pointer, wrapperRef]);

  if (options.length === 0) {
    return (
      <FloatingFocusManager context={context} modal={false} initialFocus={-1}>
        <div
          className={styles[`listbox`]}
          ref={setFloating}
          tabIndex={-1}
          style={floatingStyles}
        >
          <div className={mergedClassNames}>{emptyStateText}</div>
        </div>
      </FloatingFocusManager>
    );
  }

  return (
    <FloatingFocusManager context={context} modal={false} initialFocus={-1}>
      <div
        ref={setFloating}
        tabIndex={-1}
        className={styles['listbox']}
        style={{
          ...floatingStyles,
          maxHeight,
        }}
      >
        <div
          tabIndex={0}
          aria-multiselectable="true"
          className={styles['listbox-wrapper']}
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
          }}
          ref={wrapperRef}
          // Some screen readers do not like any wrapper tags inside
          // the element with the role, so we spread it onto the
          // virtualizer wrapper.
          {...getFloatingProps({
            onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
              setPointer(false);

              if (e.key === 'Enter' && activeIndex !== null) {
                handleSelect(options[activeIndex].key);
              }

              if (e.key === ' ') {
                e.preventDefault();
              }
            },
            onKeyUp(e: React.KeyboardEvent<HTMLDivElement>) {
              if (e.key === ' ' && activeIndex !== null) {
                handleSelect(options[activeIndex].key);
              }
            },
            onPointerMove() {
              setPointer(true);
            },
          })}
        >
          {rowVirtualizer.getVirtualItems().map((virtualItem) => (
            <PickerListItem
              virtualItem={virtualItem}
              getItemProps={getItemProps}
              listElementsRef={listElementsRef}
              isActive={activeIndex === virtualItem.index}
              isSelected={selectedKeys.includes(virtualItem.key.toString())}
              onSelect={handleSelect}
              item={options[virtualItem.index]}
              numberOfItems={numberOfItems}
            />
          ))}
        </div>
      </div>
    </FloatingFocusManager>
  );
};
