import * as React from 'react';

import { IPickerListItem } from './PickerList';
import { Tag } from '../Tag';
import { PickerType } from './Picker';

import styles from './TriggerBody.module.scss';

const baseClass = 'picker-trigger-body';

export interface ITriggerBodyProps {
  isOpen: boolean;
  isSearchDisabled?: boolean;
  placeholder: string;
  items?: IPickerListItem[] | null;
  type: PickerType;
  onItemRemove: (item: IPickerListItem) => void;
  onFilter: (text: string) => void;
}

export const TriggerBody: React.FC<ITriggerBodyProps> = ({
  isOpen,
  isSearchDisabled,
  placeholder,
  items,
  type,
  onItemRemove,
  onFilter,
}) => {
  const shouldDisplaySearch = isOpen && !isSearchDisabled;

  const getSingleItem = (name: string) => {
    if (isOpen && !isSearchDisabled) {
      return null;
    }

    return name;
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
        ? getSingleItem(items[0].name)
        : items.map((item) => {
            return (
              <Tag
                key={item.name}
                className={styles[`${baseClass}__tag`]}
                dismissible
                onRemove={() => onItemRemove(item)}
              >
                {item.name}
              </Tag>
            );
          })}
      {shouldDisplaySearch && getSearch()}
    </div>
  );
};
