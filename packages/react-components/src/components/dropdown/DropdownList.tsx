import * as React from 'react';
import { KeyCodes } from './constants';
import DropdownListItem, { IDropdownListItem } from './DropdownListItem';
import findNextFocusableItem from './helpers';
import { getFirstFocusableItemId } from './helpers';

const baseClass = 'dropdown';

import cx from 'classnames';

export interface IDropdownListItems extends IDropdownListItem {
  content?: string | React.ReactNode;
}

const DropdownList = (props: {
  autoFocusedItemId?: string | number;
  items: IDropdownListItems[];
  keyboardEventsEnabled?: boolean;
  onItemSelect?: (id: number) => void;
  onScroll?: (x: React.UIEvent<HTMLElement>) => void;
  getItemBody?: (x: IDropdownListItem) => void;
  itemSelectKeyCodes?: number[];
  className?: string | null;
}): React.ReactElement => {
  const [focusedElement, setFocusedElement] = React.useState<number | string | null>(0);


  const [isHoverDisabled, setIsHoverDisabled] = React.useState(false);
  const hoverCallbacks: (() => void)[] = [];

  let hoverEnablerTimeout: ReturnType<typeof setTimeout>;
  const listRef: React.RefObject<HTMLUListElement> = React.useRef(null);

  React.useEffect(() => {
    setFocusedElement(props.autoFocusedItemId || getFirstFocusableItemId(props.items));
    if (props.keyboardEventsEnabled) {
      document.addEventListener('keydown', onKeydown as EventListener, true);
    }

    if (props.autoFocusedItemId) {
      scrollItems();
    }

    return () => {
      if (hoverEnablerTimeout) {
        clearTimeout(hoverEnablerTimeout);
      }
      document.removeEventListener('keydown', onKeydown);
    };
  }, []);

  const onKeydown = (event: Event & { keyCode: number }) => {
    const { keyCode } = event;

    if (keyCode === KeyCodes.arrowDown || keyCode === KeyCodes.arrowUp) {
      handleArrowKeyUse(event);
    }

    if (isItemSelectKeyCode(keyCode)) {
      event.preventDefault();
      handleSelectKeyUse();
    }
  };

  const handleArrowKeyUse = (event: {
    preventDefault: () => void;
    keyCode: number;
  }) => {
    event.preventDefault();
    const { keyCode } = event;
    const { items } = props;

    const nextItem = findNextFocusableItem(
      items,
      focusedElement as number,
      keyCode
    );

    if (nextItem) {
      changeFocusedElement(nextItem.itemId);
      scrollItems();
    }
  };

  const isItemSelectKeyCode = (keyCode: number) => {
    const { itemSelectKeyCodes } = props;

    if (itemSelectKeyCodes && itemSelectKeyCodes.includes(keyCode)) {
      return true;
    }

    return false;
  };

  const handleSelectKeyUse = () => {
    if (focusedElement !== null) {
      const selectedItem = props.items.find(
        (item: { itemId: number }) => item.itemId === focusedElement
      );

      if (selectedItem && props.onItemSelect) {
        props.onItemSelect(selectedItem.itemId);
      }
    }
  };

  const changeFocusedElement = (id: number) => {
    setFocusedElement(id);

    const focusedItem = props.items.find(item => item.itemId === id);

    if (focusedItem && focusedItem.onItemFocus) {

      focusedItem.onItemFocus(focusedItem.itemId);
    }
  };

  const scrollItems = () => {
    if (!listRef.current) {
      return;
    }

    const focusedEl: HTMLElement | null = listRef.current.querySelector(
      `.lc-${baseClass}__list-item--focused`
    );

    if (focusedEl) {
      setIsHoverDisabled(true);

      const { height: ulHeight, top: ulTop } =
        listRef.current.getBoundingClientRect();
      const { height: itemHeigth, top: itemTop } =
        focusedEl.getBoundingClientRect();
      const relativeTop = itemTop + itemHeigth - ulTop;
      const itemOfsetTop = focusedEl.offsetTop;

      if (relativeTop > ulHeight) {
        listRef.current.scrollTop = itemOfsetTop - ulHeight + itemHeigth;
      } else if (itemTop < ulTop) {
        listRef.current.scrollTop = itemOfsetTop - (itemOfsetTop % itemHeigth);
      }
    }

    enableHoverOnItems(150);
  };

  const enableHoverOnItems = (delayInMs: number) => {
    if (hoverEnablerTimeout) {
      clearTimeout(hoverEnablerTimeout);
    }

    if (delayInMs) {
      hoverEnablerTimeout = setTimeout(() => {
        setIsHoverDisabled(false);
      }, delayInMs);
    } else {
      setIsHoverDisabled(false);
    }
  };

  const handleListScroll = (event: React.UIEvent<HTMLElement>) => {
    if (props.onScroll) {
      props.onScroll(event);
    }
    enableHoverOnItems(150);
  };

  const getFocusedItemCallback = (itemKey: number): (() => void) => {
    if (!hoverCallbacks[itemKey]) {
      hoverCallbacks[itemKey] = () => {
        if (!isHoverDisabled) {
          changeFocusedElement(itemKey);
        }
      };
    }

    return hoverCallbacks[itemKey];
  };

  const { className, items, ...restProps } = props;

  const mergedClassNames = cx(`${baseClass}__list`, className ? className : '');

  return (
    <ul
      className={mergedClassNames}
      tabIndex={0}
      onScroll={handleListScroll}
      {...restProps}
    >
      {items.map(({ itemId, content, onItemFocus, ...itemRestProps }) => {
        const itemProps = {
          ...itemRestProps,
          itemId,
          isFocused: itemId === focusedElement,
          onMouseOverItem: getFocusedItemCallback(itemId),
          onFocus: getFocusedItemCallback(itemId),
          onItemFocus,
        };

        if (props.getItemBody) {
          return props.getItemBody({
            ...itemProps,
            onItemFocus,
          });
        }

        return (
          <DropdownListItem
            key={itemId}
            onItemSelect={props.onItemSelect}
            {...itemProps}
          >
            {content}
          </DropdownListItem>
        );
      })}
    </ul>
  );
};

export default DropdownList;
