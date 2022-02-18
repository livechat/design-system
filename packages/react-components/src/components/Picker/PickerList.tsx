import * as React from 'react';
import cx from 'classnames';
import { Check } from '@livechat/design-system-icons/dist/material';
import { Icon, IconTypeName } from '../Icon';

const baseClass = 'lc-picker-list';
const itemClassName = `${baseClass}__item`;

export interface IPickerListItem {
  key: string;
  name: string;
}

export interface IPickerListProps {
  isOpen: boolean;
  items: IPickerListItem[];
  selectedItem: IPickerListItem | null;
  onSelect: (item: IPickerListItem) => void;
}

export const PickerList: React.FC<IPickerListProps> = ({
  isOpen,
  items,
  selectedItem,
  onSelect,
}) => {
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
              isItemSelected(item.key) && `${itemClassName}--focused`
            )}
            onClick={() => handleOnClick(item)}
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
