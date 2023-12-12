import * as React from 'react';

import { FloatingContext, FloatingFocusManager } from '@floating-ui/react';
import cx from 'clsx';
import { Virtuoso } from 'react-virtuoso';

import {
  DEFAULT_LIST_HEIGHT,
  ITEM_GAP_HEIGHT,
  SELECT_ALL_OPTION_KEY,
} from '../constants';
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
  isPositioned: boolean;
  pointer: boolean;
  activeIndex: number | null;
  selectedKeys: string[];
  setPointer: (pointer: boolean) => void;
  onSelect: (key: string) => void;
  getFloatingProps: (
    userProps?: React.HTMLProps<HTMLElement> | undefined
  ) => Record<string, unknown>;
  getItemProps: (
    userProps?: React.HTMLProps<HTMLElement> | undefined
  ) => Record<string, unknown>;
  emptyStateText?: string;
  listClassName?: string;
}

const baseClass = 'picker-list';

export const PickerList: React.FC<IPickerListProps> = ({
  context,
  setFloating,
  floatingStyles,
  maxHeight,
  options,
  isPositioned,
  pointer,
  activeIndex,
  selectedKeys,
  listElementsRef,
  setPointer,
  onSelect,
  getFloatingProps,
  getItemProps,
  emptyStateText = 'No results found',
  pickerType = 'single',
  listClassName,
}) => {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const [listHeight, setListHeight] = React.useState(DEFAULT_LIST_HEIGHT);
  const numberOfItems = options.length;

  React.useLayoutEffect(() => {
    if (isPositioned && !pointer && activeIndex !== null) {
      wrapperRef.current?.focus({ preventScroll: true });
    }
  }, [isPositioned, activeIndex, pointer, wrapperRef]);

  const handleListHeightChange = React.useCallback(
    (height: number) => {
      if (height === listHeight) {
        return;
      }
      if (height < DEFAULT_LIST_HEIGHT) {
        setListHeight(height + (numberOfItems - 1) * ITEM_GAP_HEIGHT);
      } else {
        setListHeight(DEFAULT_LIST_HEIGHT);
      }
    },
    [numberOfItems]
  );

  if (options.length === 0) {
    const noResultsStyle = cx(styles[baseClass], {
      [styles[`${baseClass}__no-results`]]: options.length === 0,
    });

    return (
      <FloatingFocusManager context={context} modal={false} initialFocus={-1}>
        <div
          className={cx(styles[`listbox`], styles['no-results'])}
          ref={setFloating}
          tabIndex={-1}
          style={floatingStyles}
        >
          <div className={noResultsStyle}>{emptyStateText}</div>
        </div>
      </FloatingFocusManager>
    );
  }

  const checkIfSelected = (key: string) =>
    selectedKeys.includes(key) ||
    (key === SELECT_ALL_OPTION_KEY &&
      selectedKeys.length ===
        options.filter(({ key }) => key !== SELECT_ALL_OPTION_KEY).length);

  return (
    <FloatingFocusManager context={context} modal={false} initialFocus={-1}>
      <div
        ref={setFloating}
        tabIndex={-1}
        className={cx(styles['listbox'], listClassName)}
        style={{
          ...floatingStyles,
          maxHeight,
        }}
      >
        <div
          tabIndex={0}
          aria-multiselectable={pickerType === 'multi'}
          className={styles['listbox-wrapper']}
          ref={wrapperRef}
          // Some screen readers do not like any wrapper tags inside
          // the element with the role, so we spread it onto the
          // virtualizer wrapper.
          {...getFloatingProps({
            onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
              setPointer(false);

              if (e.key === 'Enter' && activeIndex !== null) {
                onSelect(options[activeIndex].key);
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
