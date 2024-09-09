import * as React from 'react';
import { useEffect, useRef } from 'react';

import { FloatingContext, FloatingFocusManager } from '@floating-ui/react';
import cx from 'clsx';
import { Virtuoso, VirtuosoProps } from 'react-virtuoso';

import { ITEM_GAP_HEIGHT, SELECT_ALL_OPTION_KEY } from '../constants';
import { getNormalizedItems } from '../helpers';
import { IPickerListItem } from '../types';

import { PickerListItem } from './PickerListItem';

import styles from './PickerList.module.scss';

export interface IPickerListProps {
  pickerType?: 'single' | 'multi';
  options: IPickerListItem[];
  context: FloatingContext<HTMLButtonElement>;
  setFloating: (node: HTMLElement | null) => void;
  floatingStyles: React.CSSProperties;
  maxHeight: number;
  listElementsRef: React.MutableRefObject<(HTMLElement | null)[]>;
  activeIndex: number | null;
  selectedKeys: string[];
  isPositioned: boolean;
  searchDisabled: boolean;
  onItemRemove: (key: string) => void;
  setPointer: (pointer: boolean) => void;
  onSelect: (key: string) => void;
  getFloatingProps: (
    userProps?: React.HTMLProps<HTMLElement> | undefined
  ) => Record<string, unknown>;
  getItemProps: (
    userProps?: React.HTMLProps<HTMLElement> | undefined
  ) => Record<string, unknown>;
  emptyStateText?: string;
  hideWhenEmpty?: boolean;
  listClassName?: string;
  virtuosoProps?: VirtuosoProps<IPickerListItem, unknown>;
}

export const PickerList: React.FC<IPickerListProps> = ({
  context,
  setFloating,
  floatingStyles,
  maxHeight,
  options,
  activeIndex,
  selectedKeys,
  listElementsRef,
  isPositioned,
  searchDisabled,
  onItemRemove,
  setPointer,
  onSelect,
  getFloatingProps,
  getItemProps,
  emptyStateText = 'No results found',
  hideWhenEmpty = false,
  pickerType = 'single',
  listClassName,
  virtuosoProps,
}) => {
  const [listHeight, setListHeight] = React.useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const numberOfItems = options.length;

  const handleListHeightChange = React.useCallback(
    (height: number) => {
      if (height === listHeight) {
        return;
      }
      if (height < maxHeight) {
        setListHeight(height + (numberOfItems - 1) * ITEM_GAP_HEIGHT);
      } else {
        setListHeight(maxHeight);
      }
    },
    [numberOfItems]
  );

  useEffect(() => {
    // focusing the list to enable keyboard handlers for items selection when the search is disabled
    if (searchDisabled && isPositioned && activeIndex !== null) {
      wrapperRef.current?.focus();
    }
  }, [searchDisabled, isPositioned, activeIndex]);

  useEffect(() => {
    // eslint-disable-next-line react-compiler/react-compiler
    listElementsRef.current = new Array(options.length);
  }, [options.length]);

  if (options.length === 0) {
    if (hideWhenEmpty) {
      return null;
    }

    return (
      <FloatingFocusManager context={context} modal={false} initialFocus={-1}>
        <div
          className={cx(styles[`listbox`], styles['no-results'])}
          ref={setFloating}
          tabIndex={-1}
          style={floatingStyles}
        >
          <div className={styles['no-results-text']}>{emptyStateText}</div>
        </div>
      </FloatingFocusManager>
    );
  }

  const checkIfSelected = (key: string) =>
    selectedKeys.includes(key) ||
    (key === SELECT_ALL_OPTION_KEY &&
      selectedKeys.length === getNormalizedItems(options).length);

  const handleItemRemove = () => {
    if (pickerType === 'multi') {
      onItemRemove(selectedKeys[selectedKeys.length - 1]);
    }
  };

  return (
    <FloatingFocusManager context={context} modal={false} initialFocus={-1}>
      <div
        data-testid="picker-list"
        ref={setFloating}
        tabIndex={-1}
        className={cx(styles['listbox'], listClassName)}
        style={{
          ...floatingStyles,
          maxHeight,
        }}
      >
        <div
          ref={wrapperRef}
          tabIndex={0}
          aria-multiselectable={pickerType === 'multi'}
          className={styles['listbox-wrapper']}
          // Those handlers are run only when the search is disabled (only then the list is focused) in other cases this is handled by the search input
          {...getFloatingProps({
            onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
              setPointer(false);

              if (e.key === 'Enter' && activeIndex !== null) {
                onSelect(options[activeIndex].key);
              }

              if (e.key === 'Backspace' || e.key === 'Delete') {
                handleItemRemove();
              }

              if (e.key === ' ') {
                e.preventDefault();
              }
            },
            onKeyUp(e: React.KeyboardEvent<HTMLDivElement>) {
              if (e.key === ' ' && activeIndex !== null) {
                onSelect(options[activeIndex].key);
              }
            },
            onPointerMove() {
              setPointer(true);
            },
          })}
        >
          <Virtuoso
            totalListHeightChanged={handleListHeightChange}
            style={{ height: `${listHeight}px`, maxHeight }}
            totalCount={options.length}
            data={options}
            increaseViewportBy={200}
            {...virtuosoProps}
            itemContent={(index, item) => (
              <PickerListItem
                index={index}
                getItemProps={getItemProps}
                listElementsRef={listElementsRef}
                isActive={activeIndex === index}
                isSelected={checkIfSelected(item.key)}
                onSelect={onSelect}
                item={item}
                numberOfItems={numberOfItems}
              />
            )}
          />
        </div>
      </div>
    </FloatingFocusManager>
  );
};
