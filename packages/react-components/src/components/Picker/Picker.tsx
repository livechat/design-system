import * as React from 'react';
import { Error } from '@livechat/design-system-icons/react/material';
import cx from 'clsx';

import { Trigger, TriggerSize } from './Trigger';
import { IPickerListItem, PickerList } from './PickerList';
import { Icon } from '../Icon';
import { KeyCodes } from '../../utils/keyCodes';

import styles from './Picker.module.scss';
import { TriggerBody } from './TriggerBody';

const baseClass = 'picker';

export type PickerType = 'single' | 'multi';

export interface IPickerProps {
  className?: string;
  disabled?: boolean;
  label?: string;
  error?: string;
  options: IPickerListItem[];
  selected?: IPickerListItem[] | null;
  size?: TriggerSize;
  placeholder?: string;
  isRequired?: boolean;
  noSearchResultText?: string;
  type?: PickerType;
  searchDisabled?: boolean;
  onSelect: (selectedItems: IPickerListItem[] | null) => void;
}

export const Picker: React.FC<IPickerProps> = ({
  className,
  disabled,
  error,
  label,
  options,
  selected,
  size = 'medium',
  placeholder = 'Select option',
  isRequired,
  noSearchResultText = 'No results found',
  type = 'single',
  searchDisabled = false,
  onSelect,
}) => {
  const [isListOpen, setIsListOpen] = React.useState<boolean>(false);
  const [searchPhrase, setSearchPhrase] = React.useState<string | null>(null);
  const triggerRef = React.useRef<HTMLDivElement>(null);

  const mergedClassNames = cx(styles[baseClass], className);

  React.useEffect(() => {
    if (isListOpen) {
      const onDocumentClick = (e: MouseEvent) => {
        if (!triggerRef.current?.contains(e.target as Element)) {
          setIsListOpen(false);
        }
      };

      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === KeyCodes.tab) {
          setIsListOpen(false);
        }
      };

      document.addEventListener('mousedown', onDocumentClick);
      document.addEventListener('keydown', onKeyDown);

      return () => {
        document.removeEventListener('mousedown', onDocumentClick);
        document.addEventListener('keydown', onKeyDown);
      };
    } else {
      setSearchPhrase(null);
    }
  }, [isListOpen]);

  const handleTrigger = (e: React.MouseEvent | KeyboardEvent) => {
    const target = e.target as Element;

    if (disabled || target.getAttribute('data-dismiss-icon')) {
      return;
    }

    setIsListOpen((prev) => !prev);
  };

  const handleOnClose = () => {
    setIsListOpen(false);
  };

  const handleSelect = (item: IPickerListItem) => {
    if (type === 'single') {
      setIsListOpen(false);
      return onSelect([item]);
    }

    const currentSelectedItems = selected;

    if (!currentSelectedItems) {
      return onSelect([item]);
    }

    const newSelectedItems = currentSelectedItems.includes(item)
      ? currentSelectedItems.filter((selectedItem) => selectedItem !== item)
      : currentSelectedItems.concat(item);

    onSelect(newSelectedItems);
  };

  const isItemSelectable = (item: IPickerListItem) =>
    !item.disabled && !item.groupHeader && item.key !== 'select-all';

  const handleSelectAll = () => {
    setIsListOpen(false);

    const itemsToSelect = items.filter(isItemSelectable);

    onSelect(itemsToSelect);
  };

  const handleClear = () => {
    setIsListOpen(false);
    onSelect(null);
  };

  const handleOnFilter = (text: string) => setSearchPhrase(text);

  const handleItemRemove = (item: IPickerListItem) => {
    const newSelectedItems = selected
      ? selected.filter((selectedItem) => selectedItem !== item)
      : null;

    if (newSelectedItems?.length === 0) {
      return onSelect(null);
    }

    onSelect(newSelectedItems);
  };

  const getSelectedItemsKeys = (items: IPickerListItem[]) =>
    items ? items.map((item) => item.key) : null;

  const items = React.useMemo<IPickerListItem[]>(() => {
    if (!searchPhrase) {
      return options;
    }

    return options.filter((item) => {
      if (item.groupHeader) {
        return false;
      }

      const search = searchPhrase.toLowerCase();
      const itemName = item.name.toLowerCase();
      return itemName.includes(search);
    });
  }, [searchPhrase]);

  return (
    <div ref={triggerRef} className={mergedClassNames}>
      {label && (
        <div
          className={cx(styles[`${baseClass}__label`], {
            [styles[`${baseClass}__label--disabled`]]: disabled,
          })}
        >
          {label}
        </div>
      )}
      <div className={styles[`${baseClass}__container`]}>
        <Trigger
          isSearchDisabled={searchDisabled}
          isError={!!error}
          isOpen={isListOpen}
          isDisabled={disabled}
          isItemSelected={!!selected}
          isRequired={isRequired}
          isMultiSelect={type === 'multi'}
          size={size}
          onTrigger={handleTrigger}
          onClear={handleClear}
        >
          <TriggerBody
            isOpen={isListOpen}
            isSearchDisabled={searchDisabled}
            placeholder={placeholder}
            items={selected}
            type={type}
            onItemRemove={handleItemRemove}
            onFilter={handleOnFilter}
          />
        </Trigger>
        <PickerList
          selectedItemsKeys={selected ? getSelectedItemsKeys(selected) : null}
          items={items}
          isOpen={isListOpen}
          emptyStateText={noSearchResultText}
          onClose={handleOnClose}
          onSelect={handleSelect}
          onSelectAll={handleSelectAll}
        />
      </div>
      {error && (
        <div className={styles[`${baseClass}__error`]}>
          <Icon
            className={styles[`${baseClass}__error__icon`]}
            source={Error}
            kind="error"
            size="small"
          />
          {error}
        </div>
      )}
    </div>
  );
};
