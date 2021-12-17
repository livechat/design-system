import * as React from 'react';
import cx from 'classnames';
import * as MaterialIcons from '@livechat/design-system-icons/dist/material';
import { ISelectItem } from './interfaces';
import { EventKeys } from '../constants';
import Icon from '../Icon';

const baseClass = 'lc-select-body';

interface IHoverCallbacksProps {
  [key: string]: () => void;
}

export interface ISelectListProps {
  isOpen?: boolean;
  items: ISelectItem[];
  selectedItem?: string | number | null;
  focusedItemKey: string | null;
  listRef: React.RefObject<HTMLUListElement>;
  selectHeader?: string;
  getItemBody: (props: ISelectItem['props']) => React.ReactNode;
  onListClose: () => void;
  getItemSelectedHandler: (itemKey: string) => void;
  onEnterKey: (itemKey: string) => void;
  onFocusedItemChange: (itemKey: string) => void;
}

export const SelectList: React.FC<ISelectListProps> = ({
  isOpen,
  items,
  selectedItem,
  focusedItemKey,
  listRef,
  selectHeader,
  getItemBody,
  onListClose,
  getItemSelectedHandler,
  onEnterKey,
  onFocusedItemChange,
}) => {
  const hoverCallbacks: IHoverCallbacksProps = {};
  let timerId: ReturnType<typeof setTimeout> | null = null;

  React.useEffect(() => {
    if (isOpen) {
      if (listRef.current) {
        listRef.current.scrollTop = 0;
      }

      document.addEventListener('keydown', onKeydown);
    }

    if (!isOpen) {
      document.removeEventListener('keydown', onKeydown);

      if (timerId) {
        clearTimeout(timerId);
      }
    }
  }, [isOpen]);

  const getFocusedItemIndex = (itemKey: string) =>
    items.map((item) => item.key).indexOf(itemKey);

  const scrollItems = () => {
    if (!listRef?.current) {
      return;
    }

    const focusedElement = listRef.current.querySelector(
      `${baseClass}__item--focused`
    );

    if (focusedElement) {
      listRef.current.classList.add('disable-hover');

      const { height: ulHeight, top: ulTop } =
        listRef.current.getBoundingClientRect();

      const { height: itemHeigth, top: itemTop } =
        focusedElement.getBoundingClientRect();

      const relativeTop = itemTop + itemHeigth - ulTop;
      const itemOfsetTop = focusedElement.offsetTop;

      if (relativeTop > ulHeight) {
        listRef.current.scrollTop = itemOfsetTop - ulHeight + itemHeigth;
      } else if (itemTop < ulTop) {
        listRef.current.scrollTop = itemOfsetTop - (itemOfsetTop % itemHeigth);
      }

      timerId = setTimeout(() => {
        if (!listRef?.current) {
          return;
        }

        listRef.current.classList.remove('disable-hover');
      }, 100);
    }
  };

  const handleArrowKeyUse = (e: KeyboardEvent) => {
    e.preventDefault();

    if (!focusedItemKey) {
      return;
    }

    const currentItemIndex = getFocusedItemIndex(focusedItemKey);

    if (e.key === EventKeys.ArrowUp && currentItemIndex > 0) {
      onFocusedItemChange(items[currentItemIndex - 1].key);
    }

    if (e.key === EventKeys.ArrowDown && currentItemIndex + 1 < items.length) {
      onFocusedItemChange(items[currentItemIndex + 1].key);
    }

    scrollItems();
  };

  const handleEnterKeyUse = () => {
    if (isOpen && focusedItemKey !== null) {
      if (listRef.current) {
        listRef.current.scrollTop = 0;
      }
      onEnterKey(focusedItemKey);
    }
  };

  const onKeydown = (e: KeyboardEvent) => {
    if (e.key === EventKeys.Tab || e.key === EventKeys.Esc) {
      if (listRef.current) {
        listRef.current.scrollTop = 0;
      }
      onListClose();
    }

    if (e.key === EventKeys.ArrowDown || e.key === EventKeys.ArrowUp) {
      handleArrowKeyUse(e);
    }

    if (e.key === EventKeys.Enter) {
      handleEnterKeyUse();
    }
  };

  const getHoveredItemCallback = (itemKey: string) => {
    if (!hoverCallbacks[itemKey]) {
      hoverCallbacks[itemKey] = () => {
        if (
          listRef.current &&
          !listRef.current.classList.contains('disable-hover')
        ) {
          onFocusedItemChange(itemKey);
        }
      };
    }

    return hoverCallbacks[itemKey];
  };

  const isItemFocused = (itemKey: string) => focusedItemKey === itemKey;

  const isItemSelected = (itemKey: string) => {
    if (selectedItem === null) {
      return false;
    }

    return selectedItem === itemKey;
  };

  return (
    <ul ref={listRef} className={`${baseClass}__list`}>
      {selectHeader && (
        <li className={`${baseClass}__list__header`}>
          <div className={`${baseClass}__item-content`}>{selectHeader}</div>
        </li>
      )}
      {items
        .filter((v) => !v.hidden)
        .map((item) => (
          <li
            key={item.key}
            className={cx(`${baseClass}__item`, {
              [`${baseClass}__item--selected`]: isItemSelected(item.key),
              [`${baseClass}__item--focused`]: isItemFocused(item.key),
            })}
            onClick={() => getItemSelectedHandler(item.key)}
            onMouseEnter={getHoveredItemCallback(item.key)}
          >
            <div className={`${baseClass}__item-content`}>
              {getItemBody(item.props)}
            </div>
            {isItemSelected(item.key) && (
              <Icon source={MaterialIcons.Check}></Icon>
            )}
          </li>
        ))}
    </ul>
  );
};
