import * as React from 'react';
import cx from 'clsx';
import { Check } from '@livechat/design-system-icons/react/material';
import { Icon } from '../Icon';
import styles from './PickerList.module.scss';
import { KeyCodes } from '../../utils/keyCodes';
import { SELECT_ALL_OPTION_KEY } from './constants';

const baseClass = 'picker-list';
const itemClassName = `${baseClass}__item`;

export interface IPickerListItem {
  key: string;
  name: string;
  customElement?: {
    listItemBody: React.ReactElement;
    selectedItemBody: React.ReactElement;
  };
  groupHeader?: boolean;
  disabled?: boolean;
}

export interface IPickerListProps {
  isOpen: boolean;
  items: IPickerListItem[];
  selectedItemsKeys: string[] | null;
  emptyStateText?: string;
  selectAllOptionText?: string;
  isMultiSelect?: boolean;
  onClose: () => void;
  onSelect: (item: IPickerListItem) => void;
  onSelectAll: () => void;
}

export const PickerList: React.FC<IPickerListProps> = ({
  isOpen,
  items,
  selectedItemsKeys,
  emptyStateText = 'No results found',
  selectAllOptionText,
  isMultiSelect,
  onClose,
  onSelect,
  onSelectAll,
}) => {
  const mergedClassNames = cx(styles[baseClass], {
    [styles[`${baseClass}__no-results`]]: items.length === 0,
  });

  const [currentItemKey, setCurrentItemKey] = React.useState<string | null>(
    null
  );
  const indexRef = React.useRef(-1);
  const lastIndexRef = React.useRef(0);
  const listRef = React.useRef<HTMLUListElement>(null);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === KeyCodes.esc) {
      e.preventDefault();
      onClose();
    }

    if (e.key === KeyCodes.arrowUp && indexRef.current > 0) {
      e.preventDefault();

      indexRef.current = getPrevItemIndex();

      setCurrentItemKey(items[indexRef.current].key);
    }

    if (e.key === KeyCodes.arrowDown && indexRef.current + 1 < items.length) {
      e.preventDefault();

      indexRef.current = getNextItemIndex();

      setCurrentItemKey(items[indexRef.current].key);
    }

    if (e.key === KeyCodes.enter && !items[indexRef.current].disabled) {
      e.preventDefault();

      if (items[indexRef.current].key === SELECT_ALL_OPTION_KEY) {
        return onSelectAll();
      }

      onSelect(items[indexRef.current]);
    }
  };

  React.useEffect(() => {
    if (indexRef.current > -1 && items.length > 0) {
      setCurrentItemKey(items[indexRef.current].key);
    }

    if (isOpen) {
      document.addEventListener('keydown', onKeyDown);
      return () => document.removeEventListener('keydown', onKeyDown);
    } else {
      indexRef.current = -1;
      lastIndexRef.current = 0;
      setCurrentItemKey(null);
    }
  }, [items, isOpen, onKeyDown]);

  const isHeaderOrDisabled = (i: number) =>
    !!items[i] && (items[i].disabled || items[i].groupHeader);

  const getPrevItemIndex = () => {
    indexRef.current = indexRef.current - 1;

    while (isHeaderOrDisabled(indexRef.current)) {
      indexRef.current = indexRef.current - 1;

      if (!isHeaderOrDisabled(indexRef.current)) {
        break;
      }
    }

    lastIndexRef.current = indexRef.current;
    return indexRef.current;
  };

  const getNextItemIndex = () => {
    indexRef.current = indexRef.current + 1;

    if (!isHeaderOrDisabled(indexRef.current)) {
      lastIndexRef.current = indexRef.current;
      return indexRef.current;
    }

    while (isHeaderOrDisabled(indexRef.current)) {
      indexRef.current = indexRef.current + 1;

      if (
        indexRef.current === items.length &&
        !isHeaderOrDisabled(indexRef.current)
      ) {
        return lastIndexRef.current;
      }

      if (!isHeaderOrDisabled(indexRef.current)) {
        break;
      }
    }

    lastIndexRef.current = indexRef.current;
    return indexRef.current;
  };

  const handleOnClick = (item: IPickerListItem) => onSelect(item);

  const handleOnSelectAllClick = () => onSelectAll();

  const isItemSelected = (key: string): boolean => {
    if (!selectedItemsKeys) {
      return false;
    }

    return selectedItemsKeys.includes(key);
  };

  const getSelectAllOption = () => {
    if (!isMultiSelect || (isMultiSelect && !selectAllOptionText)) {
      return null;
    }

    return (
      <li
        ref={(element) => {
          if (currentItemKey === SELECT_ALL_OPTION_KEY) {
            element?.scrollIntoView({ block: 'nearest' });
          }
        }}
        role="option"
        aria-current={currentItemKey === SELECT_ALL_OPTION_KEY}
        id={SELECT_ALL_OPTION_KEY}
        key={SELECT_ALL_OPTION_KEY}
        className={cx(
          styles[itemClassName],
          styles[`${itemClassName}--select-all`]
        )}
        onClick={handleOnSelectAllClick}
      >
        {selectAllOptionText}
      </li>
    );
  };

  const getOptionContent = (item: IPickerListItem) => {
    if (item?.customElement) {
      return (
        <div className={styles[`${itemClassName}__custom`]}>
          {item.customElement.listItemBody}
        </div>
      );
    }

    return item.name;
  };

  if (!isOpen) {
    return null;
  }

  if (items.length === 0) {
    return <div className={mergedClassNames}>{emptyStateText}</div>;
  }

  return (
    <ul ref={listRef} className={mergedClassNames} role="listbox" tabIndex={-1}>
      {getSelectAllOption()}
      {items.map((item) => {
        if (item.groupHeader) {
          return (
            <li
              role="option"
              key={item.key}
              className={styles[`${itemClassName}__header`]}
            >
              {item.name}
            </li>
          );
        }

        return (
          <li
            data-testid={item.key}
            ref={(element) => {
              if (currentItemKey === item.key) {
                element?.scrollIntoView({ block: 'nearest' });
              }
            }}
            role="option"
            aria-current={currentItemKey === item.key}
            aria-selected={isItemSelected(item.key)}
            aria-disabled={item.disabled}
            id={item.key}
            key={item.key}
            className={cx(styles[itemClassName], {
              [styles[`${itemClassName}__custom`]]: item?.customElement,
            })}
            onClick={() => !item.disabled && handleOnClick(item)}
          >
            <div className={styles[`${itemClassName}__content`]}>
              {getOptionContent(item)}
            </div>
            {isItemSelected(item.key) && (
              <Icon
                kind="link"
                source={Check}
                customColor="var(--content-basic-info)"
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};
