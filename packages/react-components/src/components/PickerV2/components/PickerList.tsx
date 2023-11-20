import * as React from 'react';

import { FloatingFocusManager, FloatingContext } from '@floating-ui/react';
import { useVirtualizer } from '@tanstack/react-virtual';

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
  isTypingRef: React.MutableRefObject<boolean>;
  listElementsRef: React.MutableRefObject<(HTMLElement | null)[]>;
  isPositioned: boolean;
  pointer: boolean;
  activeIndex: number | null;
  selectedIndices: number[];
  setPointer: (pointer: boolean) => void;
  handleSelect: () => void;
  getFloatingProps: (
    userProps?: React.HTMLProps<HTMLElement> | undefined
  ) => Record<string, unknown>;
  getItemProps: (
    userProps?: React.HTMLProps<HTMLElement> | undefined
  ) => Record<string, unknown>;
}

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
  selectedIndices,
  wrapperRef,
  isTypingRef,
  listElementsRef,
  setPointer,
  handleSelect,
  getFloatingProps,
  getItemProps,
}) => {
  const rowVirtualizer = useVirtualizer({
    count: options.length,
    getScrollElement: () => floatingRef.current,
    estimateSize: () => ITEM_HEIGHT, // TODO
    overscan: 5,
  });

  React.useLayoutEffect(() => {
    if (isPositioned && !pointer) {
      // Nothing has been selected, reset scrolling upon open
      if (activeIndex === null && selectedIndices.length === 0) {
        rowVirtualizer.scrollToIndex(0);
      }

      // Scrolling is restored, but the item will be scrolled
      // into view when necessary
      if (activeIndex !== null) {
        wrapperRef.current?.focus({ preventScroll: true });
        rowVirtualizer.scrollToIndex(activeIndex);
      }
    }
  }, [rowVirtualizer, isPositioned, activeIndex, selectedIndices, pointer]); // todo refs

  return (
    <FloatingFocusManager context={context} modal={false}>
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
                handleSelect();
              }

              if (e.key === ' ' && !isTypingRef.current) {
                e.preventDefault();
              }
            },
            onKeyUp(e: React.KeyboardEvent<HTMLDivElement>) {
              if (e.key === ' ' && !isTypingRef.current) {
                handleSelect();
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
              activeIndex={activeIndex}
              selectedIndices={selectedIndices}
              handleSelect={handleSelect}
              item={options[virtualItem.index]}
            />
          ))}
        </div>
      </div>
    </FloatingFocusManager>
  );
};
