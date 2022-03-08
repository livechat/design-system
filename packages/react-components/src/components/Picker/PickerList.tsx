import * as React from 'react';
import cx from 'classnames';
import { Check } from '@livechat/design-system-icons/dist/material';
import { Icon, IconTypeName } from '../Icon';

export const KeyCodes = {
  enter: 13,
  arrowUp: 38,
  arrowDown: 40,
  esc: 27,
  space: 32,
  backspace: 8,
};

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
  onClose: () => void;
  onSelect: (item: IPickerListItem) => void;
}

export const PickerList: React.FC<IPickerListProps> = ({
  isOpen,
  items,
  selectedItem,
  onClose,
  onSelect,
}) => {
  const [selectedItemKey, setSelectedItemKey] = React.useState<string | null>(
    null
  );
  const indexRef = React.useRef(-1);
  const lastIndexRef = React.useRef(0);

  React.useEffect(() => {
    document.addEventListener('keydown', onKeyDown);

    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

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

  const onKeyDown = (e) => {
    e.preventDefault();

    if (e.keyCode === KeyCodes.esc) {
      return onClose();
    }

    if (e.keyCode === KeyCodes.arrowUp && indexRef.current > 0) {
      indexRef.current = getPrevItemIndex();

      const targetToScroll = document.getElementById(
        items[indexRef.current].key
      );
      targetToScroll?.scrollIntoView();

      return setSelectedItemKey(items[indexRef.current].key);
    }

    if (
      e.keyCode === KeyCodes.arrowDown &&
      indexRef.current + 1 < items.length
    ) {
      indexRef.current = getNextItemIndex();

      const targetToScroll = document.getElementById(
        items[indexRef.current].key
      );
      targetToScroll?.scrollIntoView();

      return setSelectedItemKey(items[indexRef.current].key);
    }

    if (e.keyCode === KeyCodes.enter && !items[indexRef.current].disabled) {
      return onSelect(items[indexRef.current]);
    }
  };

  const handleOnMouseEnter = (key: string) => {
    indexRef.current = items.findIndex((item) => item.key === key);
    return setSelectedItemKey(key);
  };

  const handleOnClick = (item: IPickerListItem) => {
    onSelect(item);
  };

  const isItemSelected = (key: string) => {
    return selectedItem && key === selectedItem.key;
  };

  if (!isOpen) {
    return null;
  }

  return (
    <ul className={baseClass}>
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
