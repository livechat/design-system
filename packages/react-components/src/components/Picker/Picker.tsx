import * as React from 'react';
import { Error } from '@livechat/design-system-icons/react/material';
import { Trigger, TriggerSize } from './Trigger';
import { IPickerListItem, PickerList } from './PickerList';
import { Icon } from '../Icon';
import styles from './Picker.module.scss';
import cx from 'clsx';
import { KeyCodes } from '../../utils/keyCodes';
import { Tag } from '../Tag';

// TODO:
// wysokość multipickera
// opcja "Select all"
// rozwayć case z search przy multipicker

const baseClass = 'picker';

export interface IPickerProps {
  disabled?: boolean;
  label?: string;
  error?: string;
  options: IPickerListItem[];
  size?: TriggerSize;
  placeholder?: string;
  isRequired?: boolean;
  noSearchResultText?: string;
  multiselect?: boolean;
  onSelect: (selectedItems: IPickerListItem[] | null) => void;
}

export const Picker: React.FC<IPickerProps> = ({
  disabled,
  error,
  label,
  options,
  size = 'medium',
  placeholder = 'Select option',
  isRequired,
  noSearchResultText = 'No results found',
  multiselect = false,
  onSelect,
}) => {
  const [isListOpen, setIsListOpen] = React.useState<boolean>(false);
  const [selectedItems, setSelectedItems] = React.useState<
    IPickerListItem[] | null
  >(null);
  const [searchPhrase, setSearchPhrase] = React.useState<string | null>(null);
  const triggerRef = React.useRef<HTMLDivElement>(null);

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

  React.useEffect(() => onSelect(selectedItems), [selectedItems]);

  const handleOnTriggerClick = (e: React.MouseEvent | KeyboardEvent) => {
    const target = e.target as Element;

    if (disabled || target.getAttribute('data-dismiss-icon')) {
      return;
    }

    setIsListOpen((prev) => !prev);
  };

  const handleOnClose = () => {
    setIsListOpen(false);
  };

  const handleOnSelect = (item: IPickerListItem) => {
    if (!multiselect) {
      setIsListOpen(false);
      return setSelectedItems([item]);
    }

    const currentSelectedItems = selectedItems;

    if (!currentSelectedItems) {
      return setSelectedItems([item]);
    }

    const newSelectedItems = currentSelectedItems.includes(item)
      ? currentSelectedItems.filter((selectedItem) => selectedItem !== item)
      : currentSelectedItems.concat(item);

    setSelectedItems(newSelectedItems);
  };

  const handleOnClearClick = () => {
    setIsListOpen(false);
    setSelectedItems(null);
  };

  const handleOnFilter = (text: string) => setSearchPhrase(text);

  const handleItemRemove = (item: IPickerListItem) => {
    const newSelectedItems = selectedItems
      ? selectedItems.filter((selectedItem) => selectedItem !== item)
      : null;

    if (newSelectedItems?.length === 0) {
      return setSelectedItems(null);
    }

    setSelectedItems(newSelectedItems);
  };

  const getSelectedItems = (items: IPickerListItem[]) => {
    if (!multiselect) {
      return <div>{items[0].name}</div>;
    }

    return (
      <div>
        {items.map((item) => {
          return (
            <Tag
              className={styles[`${baseClass}__tag`]}
              dismissible
              onRemove={() => handleItemRemove(item)}
            >
              {item.name}
            </Tag>
          );
        })}
      </div>
    );
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
    <div ref={triggerRef} className={baseClass}>
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
          isError={!!error}
          isOpen={isListOpen}
          isDisabled={disabled}
          isItemSelected={!!selectedItems}
          isRequired={isRequired}
          isMultiSelect={multiselect}
          size={size}
          onClick={handleOnTriggerClick}
          onClearClick={handleOnClearClick}
          onFilter={handleOnFilter}
        >
          {selectedItems ? getSelectedItems(selectedItems) : placeholder}
        </Trigger>
        <PickerList
          selectedItemsKeys={
            selectedItems ? getSelectedItemsKeys(selectedItems) : null
          }
          items={items}
          isOpen={isListOpen}
          size={size}
          emptyStateText={noSearchResultText}
          onClose={handleOnClose}
          onSelect={handleOnSelect}
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
