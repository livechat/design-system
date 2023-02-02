import * as React from 'react';

import { IPickerListItem } from './PickerList';
import { Tag } from '../Tag';
import { PickerType } from './Picker';

import styles from './TriggerBody.module.scss';
import { IconSize } from 'index';

const baseClass = 'picker-trigger-body';

export interface ITriggerBodyProps {
  isOpen: boolean;
  isSearchDisabled?: boolean;
  placeholder: string;
  items?: IPickerListItem[] | null;
  type: PickerType;
  iconSize?: IconSize;
  onItemRemove: (item: IPickerListItem) => void;
  onFilter: (text: string) => void;
}

export const TriggerBody: React.FC<ITriggerBodyProps> = ({
  isOpen,
  isSearchDisabled,
  placeholder,
  items,
  type,
  iconSize,
  onItemRemove,
  onFilter,
}) => {
  const shouldDisplaySearch = isOpen && !isSearchDisabled;

  const getSingleItem = (item: IPickerListItem) => {
    if (type === 'single' && isOpen && !isSearchDisabled) {
      return null;
    }

    if (item?.customElement) {
      return (
        <div className={styles[`${baseClass}__custom`]}>
          {item.customElement.selectedItemBody}
        </div>
      );
    }

    return item.name;
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilter(e.target.value);
  };

  const getSearch = () => (
    <input
      className={styles[`${baseClass}__input`]}
      placeholder="Select option"
      onChange={handleOnChange}
      autoFocus
    />
  );

  if (!items || items.length === 0) {
    return shouldDisplaySearch ? getSearch() : <div>{placeholder}</div>;
  }

  return (
    <div className={styles[baseClass]}>
      {type === 'single'
        ? getSingleItem(items[0])
        : items.map((item) => {
            return (
              <Tag
                key={item.name}
                className={styles[`${baseClass}__tag`]}
                iconSize={iconSize}
                dismissible
                onRemove={() => onItemRemove(item)}
              >
                {getSingleItem(item)}
              </Tag>
            );
          })}
      {shouldDisplaySearch && getSearch()}
    </div>
  );
};
