import * as React from 'react';
import cx from 'classnames';
import {
  ChevronDown,
  Close,
} from '@livechat/design-system-icons/dist/material';
import { Icon, IconSizeName } from '../Icon';
import { ISelectItem } from './interfaces';
import { EventKeys } from '../constants';
import { SelectList } from './SelectList';

const baseClass = 'lc-select';

export interface ISelectProps {
  className?: string;
  error?: string;
  id: string;
  controlledIsOpen?: boolean;
  getItemBody: (props: ISelectItem['props']) => React.ReactNode;
  getSelectedItemBody: (props: ISelectItem['props']) => React.ReactNode;
  onItemSelect: (itemKey: string) => void;
  searchEmptyState: React.ReactNode;
  items: ISelectItem[];
  searchPlaceholder?: string;
  searchProperty: string | string[];
  selected: string | number | null;
  search?: boolean;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  openedOnInit?: boolean;
  onDropdownToggle?: (v: boolean) => void;
  onSearchPhraseChange?: (phrase: string) => void;
  selectHeader?: string;
}

export const Select: React.FC<ISelectProps> = ({
  className,
  error,
  id,
  controlledIsOpen,
  getItemBody,
  getSelectedItemBody,
  onItemSelect,
  searchEmptyState,
  items = [],
  searchPlaceholder,
  searchProperty,
  selected,
  search,
  required,
  placeholder,
  disabled,
  openedOnInit,
  onDropdownToggle = () => null,
  onSearchPhraseChange,
  selectHeader,
}) => {
  let timerId: ReturnType<typeof setTimeout> | null = null;
  const [isFocused, setIsFocused] = React.useState(false);
  const [searchPhrase, setSearchPhrase] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(
    openedOnInit || controlledIsOpen || false
  );
  const [focusedItemKey, setFocusedItemKey] = React.useState(
    items[0] ? items[0].key : null
  );
  const containerRef = React.createRef<HTMLDivElement>();
  const searchInputRef = React.createRef<HTMLInputElement>();
  const headRef = React.createRef<HTMLDivElement>();
  const clearButtonRef = React.createRef<HTMLDivElement>();
  const listRef = React.createRef<HTMLUListElement>();

  const isIsOpenControlled = () => controlledIsOpen !== undefined;

  const getIsOpen = () => {
    if (disabled) {
      return false;
    }

    return isIsOpenControlled() ? controlledIsOpen : isOpen;
  };

  const onDocumentClick = (e: MouseEvent) => {
    if (
      getIsOpen() &&
      containerRef.current &&
      !containerRef.current.contains(e.target as Node) &&
      listRef?.current
    ) {
      listRef.current.scrollTop = 0;
      hideSelectBody();
    }
  };

  const onBodyOpen = () => {
    document.addEventListener('click', onDocumentClick);

    if (search && searchInputRef.current) {
      timerId = setTimeout(() => {
        searchInputRef?.current?.focus();
      }, 150);
    }
  };

  const onBodyClose = () => {
    document.removeEventListener('click', onDocumentClick);

    if (timerId) {
      clearTimeout(timerId);
    }
  };

  React.useEffect(() => {
    if (isOpen) {
      onDropdownToggle(true);
      onBodyOpen();
    }
  }, []);

  React.useEffect(() => {
    if (getIsOpen()) {
      return onBodyOpen();
    }

    if (!getIsOpen()) {
      onBodyClose();
    }
  }, [getIsOpen]);

  const filterItem = (item: any): any => {
    if (searchPhrase) {
      if (typeof searchProperty === 'string') {
        if (!(searchProperty in item.props)) {
          return false;
        }

        return item.props[searchProperty]
          .toLocaleLowerCase()
          .includes(searchPhrase.toLocaleLowerCase());
      }

      if (Array.isArray(searchProperty) && searchProperty.length > 0) {
        const validSearchProperties = searchProperty.filter(
          (p) => item.props[p]
        );

        if (validSearchProperties.length === 0) {
          return false;
        }
        return validSearchProperties.some((p) =>
          item.props[p]
            .toLocaleLowerCase()
            .includes(searchPhrase.toLocaleLowerCase())
        );
      }
    }

    return true;
  };

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchPhrase(e.target.value);

    const filteredItems = items.filter(
      (v) => filterItem(v) && selected !== v.key
    );
    const focusedItemKey =
      filteredItems.length > 0 ? filteredItems[0].key : null;

    setFocusedItemKey(focusedItemKey);

    if (onSearchPhraseChange) {
      onSearchPhraseChange(searchPhrase);
    }
  };

  const showSelectBody = () => {
    setIsOpen(true);
    setSearchPhrase('');
    onDropdownToggle(true);
  };

  const hideSelectBody = () => {
    setIsOpen(false);
    setFocusedItemKey(items[0] ? items[0].key : null);
    setSearchPhrase('');
    onDropdownToggle(false);

    if (headRef.current) {
      headRef.current.focus();
    }
  };

  const onSelectHeadClick = (e: any) => {
    e.preventDefault();

    if (disabled) {
      return;
    }

    if (clearButtonRef.current && clearButtonRef.current.contains(e.target)) {
      return;
    }

    if (!getIsOpen()) {
      showSelectBody();
    } else {
      hideSelectBody();
    }
  };

  const onArrowPress = (e: KeyboardEvent) => {
    if (e.key === EventKeys.ArrowDown || e.key === EventKeys.ArrowUp) {
      e.preventDefault();
      showSelectBody();
    }
  };

  const onSelectHeadFocus = () => {
    setIsFocused(true);

    if (!isOpen) {
      document.addEventListener('keydown', onArrowPress);
    }
  };

  const onSelectHeadBlur = () => {
    setIsFocused(false);
    document.removeEventListener('keydown', onArrowPress);
  };

  const getItemSelectedHandler = (itemKey: string) => {
    onItemSelect(itemKey);
    hideSelectBody();
  };

  const handleEnterKeyUse = (itemKey: string) => {
    onItemSelect(itemKey);
    hideSelectBody();
  };

  const shouldShowSelectBody = (filteredItems: any) => {
    const isOpen = getIsOpen();

    return (
      (isOpen && filteredItems.length > 0) ||
      (searchEmptyState &&
        searchPhrase.length > 0 &&
        filteredItems.length === 0)
    );
  };

  const changeFocusedItem = (itemKey: string) => {
    if (typeof itemKey === 'undefined' || itemKey === null) {
      return setFocusedItemKey(items[0] ? items[0].key : null);
    }

    return setFocusedItemKey(itemKey);
  };

  const clearSelectedOption = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onItemSelect('');
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const selectedItemModel = items.find((item) => item.key === selected);
  const filteredItems = items.filter(filterItem);

  const mergedClassNames = cx(
    baseClass,
    {
      [`${baseClass}--error`]: error,
    },
    className
  );

  const isCurrentlyOpen = getIsOpen();
  const shouldRenderClearButton =
    !!selectedItemModel && !isCurrentlyOpen && !required;

  return (
    <div ref={containerRef} className={mergedClassNames} id={id}>
      <div
        ref={headRef}
        className={cx(`${baseClass}-head`, {
          [`${baseClass}-head--focused`]: isCurrentlyOpen || isFocused,
          [`${baseClass}-head--disabled`]: disabled,
        })}
        tabIndex={disabled ? -1 : 0}
        onClick={onSelectHeadClick}
        onFocus={onSelectHeadFocus}
        onBlur={onSelectHeadBlur}
      >
        <div
          className={cx(`${baseClass}-head__item`, {
            [`${baseClass}-head__item--visible`]: !(isCurrentlyOpen && search),
          })}
        >
          {selectedItemModel ? (
            <div className={`${baseClass}-head__item-content`}>
              {getSelectedItemBody(selectedItemModel.props)}
            </div>
          ) : (
            <div className={`${baseClass}-head__item-placeholder`}>
              {placeholder}
            </div>
          )}
        </div>
        <div
          className={cx(`${baseClass}-head__search`, {
            [`${baseClass}-head__search--visible`]: !search
              ? false
              : isCurrentlyOpen,
          })}
        >
          <input
            ref={searchInputRef}
            className={`${baseClass}-head__input`}
            type="text"
            placeholder={searchPlaceholder || 'Search ...'}
            name="select-box-input"
            value={searchPhrase}
            onChange={onSearchChange}
            onKeyDown={onKeyDown}
            autoComplete="off"
            disabled={disabled}
          />
        </div>
        <div
          ref={clearButtonRef}
          className={cx(`${baseClass}-head__clear`, {
            [`${baseClass}-head__clear--visible`]: shouldRenderClearButton,
          })}
        >
          <div onClick={clearSelectedOption}>
            <Icon source={Close} />
          </div>
        </div>
        <Icon source={ChevronDown} size={IconSizeName.Large} />
      </div>
      <div
        className={cx(`${baseClass}-body`, {
          [`${baseClass}-body--visible`]: shouldShowSelectBody(filteredItems),
        })}
      >
        {filteredItems.length === 0 && searchEmptyState}
        <SelectList
          listRef={listRef}
          getItemBody={getItemBody}
          isOpen={isCurrentlyOpen}
          onListClose={hideSelectBody}
          items={filteredItems}
          selectedItem={selected}
          getItemSelectedHandler={getItemSelectedHandler}
          onEnterKey={handleEnterKeyUse}
          onFocusedItemChange={changeFocusedItem}
          focusedItemKey={focusedItemKey}
          selectHeader={selectHeader}
        />
      </div>
    </div>
  );
};
