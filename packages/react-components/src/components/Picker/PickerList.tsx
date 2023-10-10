import * as React from 'react';

import cx from 'clsx';

import { KeyCodes } from '../../utils/keyCodes';

import { SELECT_ALL_OPTION_KEY } from './constants';
import { getAdjacentItemPositions } from './helpers';
import { PickerListItem } from './PickerListItem';
import { IPickerListItem } from './types';

import styles from './PickerList.module.scss';

const baseClass = 'picker-list';
const itemClassName = `${baseClass}__item`;

export interface IPickerListProps {
  isOpen: boolean;
  items: IPickerListItem[];
  selectedItemsKeys: string[] | null;
  emptyStateText?: string;
  selectAllOptionText?: string;
  isMultiSelect?: boolean;
  onClose: () => void;
  onSelect: (item: IPickerListItem) => void;
  onSelectAll: () => void;
}

export const PickerList: React.FC<IPickerListProps> = ({
  isOpen,
  items,
  selectedItemsKeys,
  emptyStateText = 'No results found',
  selectAllOptionText,
  isMultiSelect,
  onClose,
  onSelect,
  onSelectAll,
}) => {
  const mergedClassNames = cx(styles[baseClass], {
    [styles[`${baseClass}__no-results`]]: items.length === 0,
  });

  const [currentItemKey, setCurrentItemKey] = React.useState<string | null>(
    null
  );
  const indexRef = React.useRef(-1);
  const lastIndexRef = React.useRef(0);
  const listRef = React.useRef<HTMLUListElement>(null);
  const [adjacentItems, setAdjacentItems] = React.useState<
    Record<string, 'top' | 'middle' | 'bottom'>
  >({});

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === KeyCodes.esc) {
      e.preventDefault();
      onClose();
    }

    if (e.key === KeyCodes.arrowUp && indexRef.current > 0) {
      e.preventDefault();

      indexRef.current = getPrevItemIndex();

      setCurrentItemKey(items[indexRef.current].key);
    }

    if (e.key === KeyCodes.arrowDown && indexRef.current + 1 < items.length) {
      e.preventDefault();

      indexRef.current = getNextItemIndex();

      setCurrentItemKey(items[indexRef.current].key);
    }

    if (
      e.key === KeyCodes.enter &&
      items[indexRef.current] &&
      !items[indexRef.current].disabled
    ) {
      e.preventDefault();

      if (items[indexRef.current].key === SELECT_ALL_OPTION_KEY) {
        return onSelectAll();
      }

      onSelect(items[indexRef.current]);
    }
  };

  React.useEffect(() => {
    if (indexRef.current > -1 && items.length > 0 && items[indexRef.current]) {
      setCurrentItemKey(items[indexRef.current].key);
    }

    if (isOpen) {
      document.addEventListener('keydown', onKeyDown);

      return () => document.removeEventListener('keydown', onKeyDown);
    } else {
      indexRef.current = -1;
      lastIndexRef.current = 0;
      setCurrentItemKey(null);
    }
  }, [items, isOpen, onKeyDown]);

  React.useEffect(() => {
    setAdjacentItems(getAdjacentItemPositions(items, selectedItemsKeys));
  }, [selectedItemsKeys, items]);

  const isHeaderOrDisabled = (i: number) =>
    !!items[i] && (items[i].disabled || items[i].groupHeader);

  const getPrevItemIndex = () => {
    indexRef.current = indexRef.current - 1;

    while (isHeaderOrDisabled(indexRef.current)) {
      indexRef.current = indexRef.current - 1;

      if (!isHeaderOrDisabled(indexRef.current)) {
        break;
      }
    }

    lastIndexRef.current = indexRef.current;

    return indexRef.current;
  };

  const getNextItemIndex = () => {
    indexRef.current = indexRef.current + 1;

    if (!isHeaderOrDisabled(indexRef.current)) {
      lastIndexRef.current = indexRef.current;

      return indexRef.current;
    }

    while (isHeaderOrDisabled(indexRef.current)) {
      indexRef.current = indexRef.current + 1;

      if (
        indexRef.current === items.length &&
        !isHeaderOrDisabled(indexRef.current)
      ) {
        return lastIndexRef.current;
      }

      if (!isHeaderOrDisabled(indexRef.current)) {
        break;
      }
    }

    lastIndexRef.current = indexRef.current;

    return indexRef.current;
  };

  const handleOnSelectAllClick = () => onSelectAll();

  const isItemSelected = (key: string): boolean => {
    if (!selectedItemsKeys) {
      return false;
    }

    return selectedItemsKeys.includes(key);
  };

  const getSelectAllOption = () => {
    if (!isMultiSelect || (isMultiSelect && !selectAllOptionText)) {
      return null;
    }

    return (
      <li
        ref={(element) => {
          if (currentItemKey === SELECT_ALL_OPTION_KEY) {
            element?.scrollIntoView({ block: 'nearest' });
          }
        }}
        role="option"
        aria-current={currentItemKey === SELECT_ALL_OPTION_KEY}
        id={SELECT_ALL_OPTION_KEY}
        key={SELECT_ALL_OPTION_KEY}
        className={cx(
          styles[itemClassName],
          styles[`${itemClassName}--select-all`]
        )}
        onClick={handleOnSelectAllClick}
      >
        {selectAllOptionText}
      </li>
    );
  };

  if (!isOpen) {
    return null;
  }

  if (items.length === 0) {
    return (
      <div className={styles[`list-wrapper`]}>
        <div className={mergedClassNames}>{emptyStateText}</div>
      </div>
    );
  }

  return (
    <div className={styles[`list-wrapper`]}>
      <ul
        ref={listRef}
        className={mergedClassNames}
        role="listbox"
        tabIndex={-1}
      >
        {getSelectAllOption()}
        {items.map((item) => (
          <PickerListItem
            item={item}
            isItemSelected={isItemSelected(item.key)}
            isAdjacentStyleApplied={adjacentItems[item.key]}
            currentItemKey={currentItemKey}
            onSelect={onSelect}
          />
        ))}
      </ul>
    </div>
  );
};
