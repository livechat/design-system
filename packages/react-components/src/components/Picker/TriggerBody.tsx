import * as React from 'react';

import cx from 'clsx';

import { Size } from 'utils';

import { Icon, IconSize } from '../Icon';
import { Tag } from '../Tag';

import { PickerType, IPickerListItem } from './types';

import styles from './TriggerBody.module.scss';

const baseClass = 'picker-trigger-body';

export interface ITriggerBodyProps {
  isOpen: boolean;
  isSearchDisabled?: boolean;
  isDisabled?: boolean;
  placeholder: string;
  items?: IPickerListItem[] | null;
  type: PickerType;
  iconSize?: IconSize;
  clearSearchAfterSelection?: boolean;
  size?: Size;
  onItemRemove: (item: IPickerListItem) => void;
  onFilter: (text: string) => void;
}

export const TriggerBody: React.FC<ITriggerBodyProps> = ({
  isOpen,
  isSearchDisabled,
  isDisabled,
  placeholder,
  items,
  type,
  iconSize,
  clearSearchAfterSelection,
  size,
  onItemRemove,
  onFilter,
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
  }, [items, clearSearchAfterSelection]);

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

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilter(e.target.value);
  };

  const getSearch = () => (
    <input
      ref={inputRef}
      className={cx(
        styles[`${baseClass}__input`],
        styles[`${baseClass}__input--${size}`]
      )}
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
      <div className={styles[`${baseClass}__item-container`]}>
        {type === 'single'
          ? getSingleItem(items[0])
          : items.map((item) => {
              return (
                <Tag
                  key={item.name}
                  className={cx(
                    styles[`${baseClass}__tag`],
                    styles[`${baseClass}__tag--${size}`]
                  )}
                  iconSize={iconSize}
                  dismissible={!isDisabled}
                  onRemove={() => onItemRemove(item)}
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
