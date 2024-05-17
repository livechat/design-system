import * as React from 'react';

import cx from 'clsx';

import { Size } from '../../../utils';
import { Icon } from '../../Icon';
import { Tag } from '../../Tag';
import { PickerType, IPickerListItem } from '../types';

import styles from './PickerTriggerBody.module.scss';

const baseClass = 'picker-trigger-body';

export interface ITriggerBodyProps {
  isOpen: boolean;
  isSearchDisabled?: boolean;
  isDisabled?: boolean;
  placeholder: string;
  searchPhrase?: string;
  selectedItems?: IPickerListItem[] | null;
  type: PickerType;
  clearSearchAfterSelection?: boolean;
  size?: Size;
  onItemRemove: (key: string) => void;
  onSelect: (key: string) => void;
  onFilter: (text: string) => void;
  onClear: () => void;
  virtualItemRef: React.MutableRefObject<HTMLElement | null>;
  isTriggerFocused: boolean;
}

export const PickerTriggerBody: React.FC<ITriggerBodyProps> = ({
  isOpen,
  isSearchDisabled,
  isDisabled,
  placeholder,
  selectedItems,
  type,
  clearSearchAfterSelection,
  size = 'medium',
  onItemRemove,
  onSelect,
  onFilter,
  onClear,
  searchPhrase,
  virtualItemRef,
  isTriggerFocused,
}) => {
  const shouldDisplaySearch = isOpen && !isSearchDisabled;
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (clearSearchAfterSelection) {
      onFilter('');

      if (inputRef.current) {
        inputRef.current.value = '';
        inputRef.current.focus();
      }
    }
  }, [selectedItems, clearSearchAfterSelection]);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Backspace' && selectedItems && selectedItems.length > 0) {
      e.preventDefault();
      if (type === 'multi') {
        onItemRemove(selectedItems[selectedItems.length - 1].key);
      } else {
        onClear();
      }
    }

    if (e.key === 'Delete') {
      e.preventDefault();
      onClear();
    }
  };

  React.useEffect(() => {
    if (!isOpen && isTriggerFocused) {
      document.addEventListener('keydown', onKeyDown);
    } else {
      document.removeEventListener('keydown', onKeyDown);
    }

    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, selectedItems, isTriggerFocused]);

  const getSingleItem = (item: IPickerListItem) => {
    if (type === 'single' && isOpen && !isSearchDisabled) {
      return null;
    }

    if (item?.customElement) {
      return (
        <div className={styles[`${baseClass}__item`]}>
          {item.customElement.selectedItemBody}
        </div>
      );
    }

    return (
      <div className={styles[`${baseClass}__item`]}>
        {item.icon && (
          <Icon
            source={item.icon}
            className={styles[`${baseClass}__item__icon`]}
          />
        )}
        {item.avatarSrc && (
          <img
            src={item.avatarSrc}
            alt=""
            className={styles[`${baseClass}__item__avatar`]}
          />
        )}
        <div className={styles[`${baseClass}__item__content`]}>{item.name}</div>
      </div>
    );
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    onFilter(e.target.value);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (virtualItemRef.current?.id && e.key === 'Enter') {
      onSelect(virtualItemRef.current?.id);
    }
    if (
      type === 'multi' &&
      (e.key === 'Backspace' || e.key === 'Delete') &&
      !searchPhrase &&
      selectedItems &&
      selectedItems?.length > 0
    ) {
      onItemRemove(selectedItems[selectedItems.length - 1].key);
    }
  };

  const getSearch = () => (
    <input
      ref={inputRef}
      className={cx(
        styles[`${baseClass}__input`],
        styles[`${baseClass}__input--${size}`]
      )}
      placeholder={placeholder}
      onChange={handleOnChange}
      onKeyDown={handleKeyDown}
      autoFocus
      value={searchPhrase}
    />
  );

  if (!selectedItems || selectedItems.length === 0) {
    return shouldDisplaySearch ? (
      getSearch()
    ) : (
      <div
        className={cx({
          [styles[`${baseClass}__placeholder`]]: true,
          [styles[`${baseClass}__placeholder--disabled`]]: isDisabled,
        })}
      >
        {placeholder}
      </div>
    );
  }

  return (
    <div
      className={cx(styles[baseClass], {
        [styles[`${baseClass}--single`]]: type === 'single',
      })}
    >
      <div className={styles[`${baseClass}__item-container`]}>
        {type === 'single'
          ? getSingleItem(selectedItems[0])
          : selectedItems.map((item) => {
              return (
                <Tag
                  key={item.name}
                  className={cx(
                    styles[`${baseClass}__tag`],
                    styles[`${baseClass}__tag--${size}`]
                  )}
                  disabled={isDisabled}
                  onRemove={(e) => {
                    e.stopPropagation();
                    onItemRemove(item.key);
                  }}
                >
                  {getSingleItem(item)}
                </Tag>
              );
            })}
      </div>
      {shouldDisplaySearch && getSearch()}
    </div>
  );
};
