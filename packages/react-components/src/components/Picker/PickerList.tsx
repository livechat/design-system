import * as React from 'react';
import cx from 'clsx';
import { Check } from '@livechat/design-system-icons/react/material';
import { Icon, IconTypeName } from '../Icon';
import styles from './PickerList.module.scss';
import { KeyCodes } from '../../utils/keyCodes';
import { TriggerSize } from './Trigger';

const baseClass = 'picker-list';
const itemClassName = `${baseClass}__item`;

export interface IPickerListItem {
  key: string;
  name: string;
  groupHeader?: boolean;
  disabled?: boolean;
}

export interface IPickerListProps {
  isOpen: boolean;
  items: IPickerListItem[];
  selectedItem: IPickerListItem | null;
  size?: TriggerSize;
  emptyStateText?: string;
  onClose: () => void;
  onSelect: (item: IPickerListItem) => void;
}

export const PickerList: React.FC<IPickerListProps> = ({
  isOpen,
  items,
  selectedItem,
  size = 'medium',
  emptyStateText = 'No results found',
  onClose,
  onSelect,
}) => {
  const mergedClassNames = cx(
    styles[baseClass],
    styles[`${baseClass}--${size}`],
    {
      [styles[`${baseClass}__no-results`]]: items.length === 0,
    }
  );

  const [currentItemKey, setCurrentItemKey] = React.useState<string | null>(
    null
  );
  const indexRef = React.useRef(-1);
  const lastIndexRef = React.useRef(0);
  const listRef = React.useRef<HTMLUListElement>(null);

  React.useEffect(() => {
    indexRef.current = 0;

    if (items.length > 0) {
      setCurrentItemKey(items[indexRef.current].key);
    }

    if (isOpen) {
      document.addEventListener('keydown', onKeyDown);
    }

    return () => document.removeEventListener('keydown', onKeyDown);
  }, [items, isOpen]);

  const scrollItems = () => {
    if (!listRef.current) {
      return;
    }

    const focusedElement = listRef.current.querySelector(
      `[aria-current="true"]`
    );

    if (focusedElement instanceof HTMLElement) {
      const { height: ulHeight, top: ulTop } =
        listRef.current.getBoundingClientRect();

      const { height: itemHeigth, top: itemTop } =
        focusedElement.getBoundingClientRect();

      const relativeTop = itemTop + itemHeigth - ulTop;
      const itemOfsetTop = focusedElement.offsetTop;

      if (relativeTop > ulHeight) {
        listRef.current.scrollTop = itemOfsetTop - ulHeight + itemHeigth;
      } else if (itemTop < ulTop) {
        listRef.current.scrollTop = itemOfsetTop - (itemOfsetTop % itemHeigth);
      }
    }
  };

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

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === KeyCodes.esc) {
      e.preventDefault();

      return onClose();
    }

    if (e.key === KeyCodes.arrowUp && indexRef.current > 0) {
      e.preventDefault();

      indexRef.current = getPrevItemIndex();

      setCurrentItemKey(items[indexRef.current].key);
      scrollItems();
    }

    if (e.key === KeyCodes.arrowDown && indexRef.current + 1 < items.length) {
      e.preventDefault();

      indexRef.current = getNextItemIndex();

      setCurrentItemKey(items[indexRef.current].key);
      scrollItems();
    }

    if (e.key === KeyCodes.enter && !items[indexRef.current].disabled) {
      e.preventDefault();

      return onSelect(items[indexRef.current]);
    }
  };

  const handleOnClick = (item: IPickerListItem) => onSelect(item);

  const isItemSelected = (key: string): boolean =>
    !!selectedItem && key === selectedItem.key;

  if (!isOpen) {
    return null;
  }

  if (items.length === 0) {
    return <div className={mergedClassNames}>{emptyStateText}</div>;
  }

  return (
    <ul ref={listRef} className={mergedClassNames} role="listbox" tabIndex={-1}>
      {items.map((item) => {
        if (item.groupHeader) {
          return (
            <li
              role="option"
              key={item.key}
              className={styles[`${itemClassName}__header`]}
            >
              {item.name}
            </li>
          );
        }

        return (
          <li
            role="option"
            aria-current={currentItemKey === item.key}
            aria-selected={isItemSelected(item.key)}
            aria-disabled={item.disabled}
            id={item.key}
            key={item.key}
            className={styles[itemClassName]}
            onClick={() => !item.disabled && handleOnClick(item)}
          >
            {item.name}
            {isItemSelected(item.key) && (
              <Icon iconType={IconTypeName.Link} source={Check} />
            )}
          </li>
        );
      })}
    </ul>
  );
};
