import * as React from 'react';

import { SELECT_ALL_OPTION_KEY } from '../constants';
import {
  getNewIndexes,
  getNormalizedItems,
  getPickerListItemKey,
} from '../helpers';
import { IPickerListItem } from '../types';

interface UsePickerItemsProps {
  selected?: IPickerListItem[] | null;
  options: IPickerListItem[];
  type: 'single' | 'multi';
  selectAllOptionText?: string;
  onSelect: (items: IPickerListItem[] | null) => void;
  setOpen: (isOpen: boolean) => void;
}

interface IUsePickerItems {
  selectedKeys: string[];
  items: IPickerListItem[];
  searchPhrase: string;
  handleSelect: (key: string) => void;
  handleOnFilter: (text: string) => void;
  handleItemRemove: (itemKey: string) => void;
  handleClear: () => void;
}

export const usePickerItems = ({
  selected,
  options,
  type,
  selectAllOptionText,
  onSelect,
  setOpen,
}: UsePickerItemsProps): IUsePickerItems => {
  const [_selectedKeys, setSelectedKeys] = React.useState<string[]>(
    () => selected?.map(getPickerListItemKey) || []
  );
  const isDataControlled = selected !== undefined;
  const selectedKeys = isDataControlled
    ? selected?.map(getPickerListItemKey) || []
    : _selectedKeys;

  const [searchPhrase, setSearchPhrase] = React.useState<string>('');

  const items = React.useMemo<IPickerListItem[]>(() => {
    const shouldShowSelectAll = type === 'multi' && selectAllOptionText;
    let items = options;

    if (searchPhrase) {
      items = items.filter((item) => {
        if (item.groupHeader) {
          return false;
        }

        const search = searchPhrase.toLowerCase();
        const itemName = item.name.toLowerCase();

        return itemName.includes(search);
      });
    }

    if (shouldShowSelectAll && items.length > 1) {
      items = [
        {
          key: SELECT_ALL_OPTION_KEY,
          name: selectAllOptionText,
        },
        ...items,
      ];
    }

    return items;
  }, [searchPhrase, options, type, selectAllOptionText]);

  const handleSelect = (key: string) => {
    const item = options.find((item) => item.key === key);
    if (!item || item.disabled) {
      return;
    }

    if (type === 'single') {
      setOpen(false);
      setSelectedKeys(() => {
        onSelect([item]);

        return [key];
      });
    } else {
      if (key === SELECT_ALL_OPTION_KEY) {
        if (selectedKeys.length === getNormalizedItems(options).length) {
          setSelectedKeys(() => {
            onSelect(null);

            return [];
          });
        } else {
          setSelectedKeys(() => {
            const newItems = getNormalizedItems(options);
            onSelect(newItems);

            return newItems.map(({ key }) => key);
          });
        }
      } else {
        if (isDataControlled) {
          const prev = selected?.map(getPickerListItemKey) || [];
          const newIndexes = getNewIndexes(prev, key);
          onSelect(options.filter(({ key }) => newIndexes.includes(key)));
        } else {
          setSelectedKeys((prev) => {
            const newIndexes = getNewIndexes(prev, key);
            onSelect(options.filter(({ key }) => newIndexes.includes(key)));

            return newIndexes;
          });
        }
      }
    }
  };

  const handleOnFilter = (text: string) => setSearchPhrase(text);

  const handleItemRemove = (itemKey: string) => handleSelect(itemKey);

  const handleClear = () => {
    setOpen(false);
    setSelectedKeys([]);
    onSelect(null);
    setSearchPhrase('');
  };

  return {
    selectedKeys,
    items,
    searchPhrase,
    handleSelect,
    handleOnFilter,
    handleItemRemove,
    handleClear,
  };
};
