import * as React from 'react';
import cx from 'clsx';

import { Trigger } from './Trigger';
import { IPickerListItem, PickerList } from './PickerList';
import { IconSize } from '../Icon';
import { KeyCodes } from '../../utils/keyCodes';

import styles from './Picker.module.scss';
import { TriggerBody } from './TriggerBody';
import { SELECT_ALL_OPTION_KEY } from './constants';
import { Size } from 'utils';

const baseClass = 'picker';

export type PickerType = 'single' | 'multi';

export interface IPickerProps {
  /**
   * Specify the custom id
   */
  id?: string;
  /**
   * The CSS class for picker container
   */
  className?: string;
  /**
   * Specify whether the picker should be disabled
   */
  disabled?: boolean;
  /**
   * Specify whether the picker should be in error state
   */
  error?: boolean;
  /**
   * Array of picker options
   */
  options: IPickerListItem[];
  /**
   * Array of picker selected options
   */
  selected?: IPickerListItem[] | null;
  /**
   * Specify the picker size
   */
  size?: Size;
  /**
   * Set the dismiss icon size in tags when `multi` type is enabled
   */
  tagIconSize?: IconSize;
  /**
   * Specify the placeholder for search input
   */
  placeholder?: string;
  /**
   * Specify whether the option select is required
   */
  isRequired?: boolean;
  /**
   * Text if no search result were found
   */
  noSearchResultText?: string;
  /**
   * Text for `select all` option which will be visible if defined in multi select mode
   */
  selectAllOptionText?: string;
  /**
   * Set `multi` to specify whether the picker should allow to multi selection
   */
  type?: PickerType;
  /**
   * Set to disable search input
   */
  searchDisabled?: boolean;
  /**
   * Set to hide clear selection button
   */
  hideClearButton?: boolean;
  /**
   * Will open picker on component initialization
   */
  openedOnInit?: boolean;
  /**
   * Test id passed to the picker trigger element
   */
  ['data-testid']?: string;
  /**
   * Callback called after item selection
   */
  onSelect: (selectedItems: IPickerListItem[] | null) => void;
  /**
   * Clears the search input after item select
   */
  clearSearchAfterSelection?: boolean;
}

export const Picker: React.FC<IPickerProps> = ({
  className,
  disabled,
  error,
  options,
  selected,
  size = 'medium',
  tagIconSize = 'medium',
  placeholder = 'Select option',
  isRequired,
  noSearchResultText = 'No results found',
  selectAllOptionText,
  type = 'single',
  searchDisabled = false,
  hideClearButton,
  openedOnInit = false,
  clearSearchAfterSelection,
  onSelect,
  ...props
}) => {
  const [isListOpen, setIsListOpen] = React.useState<boolean>(openedOnInit);
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

    const selectedItemKey = item.key;
    const currentSelectedItemsKeys = selectedItemsKeys;

    if (!currentSelectedItemsKeys) {
      return onSelect([item]);
    }

    const newSelectedItemsKeys = currentSelectedItemsKeys.includes(
      selectedItemKey
    )
      ? currentSelectedItemsKeys.filter((key) => key !== selectedItemKey)
      : currentSelectedItemsKeys.concat(selectedItemKey);

    if (newSelectedItemsKeys?.length === 0) {
      return onSelect(null);
    }

    const newSelectedItems = options.filter((item) =>
      newSelectedItemsKeys.includes(item.key)
    );

    onSelect(newSelectedItems);
  };

  const isItemSelectable = (item: IPickerListItem) =>
    !item.disabled && !item.groupHeader && item.key !== SELECT_ALL_OPTION_KEY;

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
  }, [searchPhrase, options]);

  const selectedItemsKeys = React.useMemo(() => {
    if (!selected) {
      return null;
    }

    return selected.map((item) => item.key);
  }, [selected]);

  return (
    <div ref={triggerRef} className={mergedClassNames} id={props.id}>
      <div className={styles[`${baseClass}__container`]}>
        <Trigger
          testId={props['data-testid']}
          isSearchDisabled={searchDisabled}
          isError={error}
          isOpen={isListOpen}
          isDisabled={disabled}
          isItemSelected={!!selected}
          isRequired={isRequired}
          isMultiSelect={type === 'multi'}
          size={size}
          hideClearButton={hideClearButton}
          onTrigger={handleTrigger}
          onClear={handleClear}
        >
          <TriggerBody
            isOpen={isListOpen}
            isSearchDisabled={searchDisabled}
            isDisabled={disabled}
            placeholder={placeholder}
            iconSize={tagIconSize}
            items={selected}
            type={type}
            clearSearchAfterSelection={clearSearchAfterSelection}
            onItemRemove={handleItemRemove}
            onFilter={handleOnFilter}
          />
        </Trigger>
        <PickerList
          selectedItemsKeys={selectedItemsKeys}
          items={items}
          isOpen={isListOpen}
          isMultiSelect={type === 'multi'}
          emptyStateText={noSearchResultText}
          selectAllOptionText={selectAllOptionText}
          onClose={handleOnClose}
          onSelect={handleSelect}
          onSelectAll={handleSelectAll}
        />
      </div>
    </div>
  );
};
