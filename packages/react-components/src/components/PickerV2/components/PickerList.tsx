import * as React from 'react';

import { FloatingFocusManager, FloatingContext } from '@floating-ui/react';
import { useVirtualizer } from '@tanstack/react-virtual';

import styles from '../Picker.module.scss';
import { IPickerListItem } from '../types';

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
  selectedIndex: number | null;
  setPointer: (pointer: boolean) => void;
  handleSelect: () => void;
  getFloatingProps: (
    userProps?: React.HTMLProps<HTMLElement> | undefined
  ) => Record<string, unknown>;
  getItemProps: (
    userProps?: React.HTMLProps<HTMLElement> | undefined
  ) => Record<string, unknown>;
}

const ITEM_HEIGHT = 35;
const ITEMS_COUNT = 35;

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
  selectedIndex,
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
      if (activeIndex === null && selectedIndex === null) {
        rowVirtualizer.scrollToIndex(0);
      }

      // Scrolling is restored, but the item will be scrolled
      // into view when necessary
      if (activeIndex !== null) {
        wrapperRef.current?.focus({ preventScroll: true });
        rowVirtualizer.scrollToIndex(activeIndex);
      }
    }
  }, [rowVirtualizer, isPositioned, activeIndex, selectedIndex, pointer]); // todo refs

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
                  activeIndex === virtualItem.index
                    ? 'rgba(0, 200, 255, 0.3)'
                    : 'none',
              }}
              {...getItemProps({
                onClick: handleSelect,
              })}
            >
              List item {virtualItem.index + 1}
              <span>{virtualItem.index === selectedIndex ? '✔' : ''}</span>
            </div>
          ))}
        </div>
      </div>
    </FloatingFocusManager>
  );
};
