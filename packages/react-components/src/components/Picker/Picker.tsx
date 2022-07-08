import * as React from 'react';
import { Error } from '@livechat/design-system-icons/react/material';
import cx from 'clsx';

import { Trigger, TriggerSize } from './Trigger';
import { IPickerListItem, PickerList } from './PickerList';
import { Icon } from '../Icon';
import { KeyCodes } from '../../utils/keyCodes';

import styles from './Picker.module.scss';

const baseClass = 'picker';

export interface IPickerProps {
  disabled?: boolean;
  label?: string;
  error?: string;
  options: IPickerListItem[];
  selectedOption?: IPickerListItem;
  size?: TriggerSize;
  placeholder?: string;
  isRequired?: boolean;
  noSearchResultText?: string;
  searchDisabled?: boolean;
  onSelect: (selectedItem: IPickerListItem | null) => void;
}

export const Picker: React.FC<IPickerProps> = ({
  disabled,
  error,
  label,
  options,
  selectedOption,
  size = 'medium',
  placeholder = 'Select option',
  isRequired,
  noSearchResultText = 'No results found',
  searchDisabled = false,
  onSelect,
}) => {
  const [isListOpen, setIsListOpen] = React.useState<boolean>(false);
  const [selectedItem, setSelectedItem] =
    React.useState<IPickerListItem | null>(selectedOption || null);
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

  const handleOnTriggerClick = () => {
    if (disabled) {
      return;
    }

    return setIsListOpen((prev) => !prev);
  };

  const handleOnClose = () => {
    setIsListOpen(false);
  };

  const handleOnSelect = (item: IPickerListItem) => {
    setIsListOpen(false);
    setSelectedItem(item);
    onSelect(item);
  };

  const handleOnClearClick = () => {
    setIsListOpen(false);
    setSelectedItem(null);
    onSelect(null);
  };

  const handleOnFilter = (text: string) => setSearchPhrase(text);

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
    <div ref={triggerRef} className={styles[baseClass]}>
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
          isItemSelected={!!selectedItem}
          isRequired={isRequired}
          size={size}
          onClick={handleOnTriggerClick}
          onClearClick={handleOnClearClick}
          onFilter={handleOnFilter}
        >
          {selectedItem ? selectedItem.name : placeholder}
        </Trigger>
        <PickerList
          selectedItem={selectedItem}
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
