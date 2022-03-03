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

  React.useEffect(() => {
    document.addEventListener('keydown', onKeyDown);

    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  const indexRef = React.useRef(0);

  const onKeyDown = (e) => {
    e.preventDefault();

    if (e.keyCode === KeyCodes.esc) {
      return onClose();
    }

    if (e.keyCode === KeyCodes.arrowUp && indexRef.current > 0) {
      indexRef.current = indexRef.current - 1;
      return setSelectedItemKey(items[indexRef.current].key);
    }

    if (
      e.keyCode === KeyCodes.arrowDown &&
      indexRef.current + 1 < items.length
    ) {
      indexRef.current = indexRef.current + 1;
      return setSelectedItemKey(items[indexRef.current].key);
    }

    if (e.keyCode === KeyCodes.enter && !items[indexRef.current].disabled) {
      return onSelect(items[indexRef.current]);
    }
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
        return (
          <li
            key={item.key}
            className={cx(
              itemClassName,
              selectedItemKey === item.key && `${itemClassName}--hovered`,
              isItemSelected(item.key) && `${itemClassName}--focused`,
              item.disabled && `${itemClassName}--disabled`
            )}
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
