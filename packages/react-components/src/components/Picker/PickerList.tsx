import * as React from 'react';
import cx from 'classnames';
import { Check } from '@livechat/design-system-icons/dist/material';
import { Icon, IconTypeName } from '../Icon';
import { KeyCodes } from '../../constants/keyCodes';
import { TriggerSize } from './Trigger';

const baseClass = 'lc-picker-list';
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
  onClose: () => void;
  onSelect: (item: IPickerListItem) => void;
}

export const PickerList: React.FC<IPickerListProps> = ({
  isOpen,
  items,
  selectedItem,
  size = TriggerSize.Medium,
  onClose,
  onSelect,
}) => {
  const mergedClassNames = cx(
    baseClass,
    `${baseClass}--${size as string}`,
    items.length === 0 && `${baseClass}__no-results`
  );

  const [selectedItemKey, setSelectedItemKey] = React.useState<string | null>(
    null
  );
  const indexRef = React.useRef(-1);
  const lastIndexRef = React.useRef(0);
  const listRef = React.useRef<HTMLUListElement>(null);

  React.useEffect(() => {
    document.addEventListener('keydown', onKeyDown);

    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  const scrollItems = () => {
    if (!listRef.current) {
      return;
    }

    const focusedElement = listRef.current.querySelector(
      `.${itemClassName}--hovered`
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

      setSelectedItemKey(items[indexRef.current].key);
      scrollItems();
    }

    if (e.key === KeyCodes.arrowDown && indexRef.current + 1 < items.length) {
      e.preventDefault();

      indexRef.current = getNextItemIndex();

      setSelectedItemKey(items[indexRef.current].key);
      scrollItems();
    }

    if (e.key === KeyCodes.enter && !items[indexRef.current].disabled) {
      e.preventDefault();

      return onSelect(items[indexRef.current]);
    }
  };

  const handleOnMouseEnter = (key: string) => {
    indexRef.current = items.findIndex((item) => item.key === key);
    return setSelectedItemKey(key);
  };

  const handleOnClick = (item: IPickerListItem) => onSelect(item);

  const isItemSelected = (key: string) =>
    selectedItem && key === selectedItem.key;

  if (!isOpen) {
    return null;
  }

  if (items.length === 0) {
    return <div className={mergedClassNames}>No results found</div>;
  }

  return (
    <ul ref={listRef} className={mergedClassNames}>
      {items.map((item) => {
        if (item.groupHeader) {
          return (
            <li key={item.key} className={`${itemClassName}__header`}>
              {item.name}
            </li>
          );
        }

        return (
          <li
            id={item.key}
            key={item.key}
            className={cx(
              itemClassName,
              selectedItemKey === item.key && `${itemClassName}--hovered`,
              isItemSelected(item.key) && `${itemClassName}--focused`,
              item.disabled && `${itemClassName}--disabled`
            )}
            onClick={() => !item.disabled && handleOnClick(item)}
            onMouseEnter={() => handleOnMouseEnter(item.key)}
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
