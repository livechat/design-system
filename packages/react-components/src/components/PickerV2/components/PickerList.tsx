import * as React from 'react';

import { FloatingFocusManager, FloatingContext } from '@floating-ui/react';
import { useVirtualizer } from '@tanstack/react-virtual';
import cx from 'clsx';

import { ITEM_HEIGHT } from '../constants';
import styles from '../Picker.module.scss';
import { IPickerListItem } from '../types';

import { PickerListItem } from './PickerListItem';

interface IPickerListProps {
  options: IPickerListItem[];
  context: FloatingContext<HTMLButtonElement>;
  setFloating: (node: HTMLElement | null) => void;
  floatingStyles: React.CSSProperties;
  maxHeight: number;
  floatingRef: React.MutableRefObject<HTMLElement | null>;
  wrapperRef: React.MutableRefObject<HTMLDivElement | null>;
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
  wrapperRef,
  listElementsRef,
  setPointer,
  handleSelect,
  getFloatingProps,
  getItemProps,
  emptyStateText,
  // selectAllOptionText,
}) => {
  const mergedClassNames = cx(styles[baseClass], {
    [styles[`${baseClass}__no-results`]]: options.length === 0,
  });

  const rowVirtualizer = useVirtualizer({
    count: options.length,
    getScrollElement: () => floatingRef.current,
    estimateSize: () => ITEM_HEIGHT, // TODO
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
  }, [rowVirtualizer, isPositioned, activeIndex, pointer]); // todo refs

  if (options.length === 0) {
    return (
      <div className={styles[`list-wrapper`]}>
        <div className={mergedClassNames}>{emptyStateText}</div>
      </div>
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
          aria-multiselectable="true"
          className={styles['listbox-wrapper']}
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
          }}
          ref={wrapperRef}
          // Some screen readers do not like any wrapper tags inside
          // of the element with the role, so we spread it onto the
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
          // Ensure this element receives focus upon open so keydowning works.
          tabIndex={0}
        >
          {rowVirtualizer.getVirtualItems().map((virtualItem) => (
            <PickerListItem
              virtualItem={virtualItem}
              getItemProps={getItemProps}
              listElementsRef={listElementsRef}
              isActive={activeIndex === virtualItem.index}
              isSelected={selectedKeys.includes(virtualItem.key.toString())}
              handleSelect={handleSelect}
              item={options[virtualItem.index]}
            />
          ))}
        </div>
      </div>
    </FloatingFocusManager>
  );
};
