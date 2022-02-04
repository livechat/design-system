import * as React from 'react';
import cx from 'classnames';
import { Check } from '@livechat/design-system-icons/dist/material';
import { Icon, IconTypeName } from '../Icon';

const baseClass = 'lc-picker-list';

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
  const mergedClassNames = cx(baseClass);

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
    <div className={mergedClassNames}>
      {items.map((item) => {
        return (
          <div
            key={item.key}
            className={cx(`${baseClass}_item`, {
              [`${baseClass}_item--focused`]: isItemSelected(item.key),
            })}
            onClick={() => handleOnClick(item)}
          >
            {item.name}
            {isItemSelected(item.key) && (
              <Icon iconType={IconTypeName.Link} source={Check}></Icon>
            )}
          </div>
        );
      })}
    </div>
  );
};
