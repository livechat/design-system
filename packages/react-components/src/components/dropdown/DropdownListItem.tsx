import { useEffect } from 'react';
import * as React from 'react';

import cx from 'classnames';
import { Check } from '@livechat/design-system-icons/dist/material';
import { Icon, IconSizeName, IconTypeName } from '../../components/Icon';
const baseClass = 'dropdown__list-item';

export interface IDropdownListItem {
  children?: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  itemId: number;
  isFocused?: boolean;
  isSelected?: boolean;
  divider?: boolean;
  isDisabled?: boolean;
  onItemSelect?: (
    itemId: number,
    event:
      | React.KeyboardEvent<HTMLLIElement>
      | React.MouseEvent<HTMLLIElement>
      | Event
  ) => void;
  onClick?: (event: React.MouseEvent<HTMLLIElement>) => void;
  onMouseOver?: (event: React.MouseEvent<HTMLLIElement>) => void;
  onMouseOverItem?: (itemId: number | string) => void;
  onMouseDown?: (event: React.MouseEvent<HTMLLIElement>) => void;
  onItemFocus?: (id: number) => boolean;
}

const DropdownListItem: React.FC<IDropdownListItem> = ({
  isFocused,
  isDisabled,
  onItemSelect,
  itemId,
  onClick,
  onMouseOverItem,
  onMouseOver,
  onMouseDown,
  onItemFocus,
  className,
  icon,
  children,
  isSelected,
  divider,
}) => {
  const itemRef: React.RefObject<HTMLLIElement> | null = React.useRef(null);
  let focusTimeout: ReturnType<typeof setTimeout> | null = null;

  useEffect(() => {
    if (isFocused && itemRef.current) {
      itemRef.current.focus();
      // dropdown needs to be positioned correctly at first so we need to postpone the focus
      focusTimeout = setTimeout(() => {
        itemRef.current?.focus();
      }, 0);
    }

    return () => {
      if (focusTimeout) {
        clearTimeout(focusTimeout);
      }
    };
  }, []);

  useEffect(() => {
    if (isFocused && itemRef.current) {
      itemRef.current.focus();

      return;
    }

    if (!isFocused && itemRef.current) {
      itemRef.current.blur();

      return;
    }
  });

  const handleClick = (event: React.MouseEvent<HTMLLIElement>) => {
    if (!isDisabled && onItemSelect) {
      event.nativeEvent.stopImmediatePropagation();
      onItemSelect(itemId, event);
    }
    if (onClick) {
      onClick(event);
    }
  };

  const handleMouseOver = (event: React.MouseEvent<HTMLLIElement>) => {
    if (!isDisabled && onMouseOverItem) {
      onMouseOverItem(itemId);
    }
    if (onMouseOver) {
      onMouseOver(event);
    }
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLLIElement>) => {
    event.preventDefault();
    if (onMouseDown) {
      onMouseDown(event);
    }
    return false;
  };

  const handleFocus = (id: number) => {
    if (onItemFocus) {
      onItemFocus(id);
    }

    return false;
  };

  const mergedClassNames = cx({
    [`${baseClass}`]: true,
    [`${baseClass}--selected`]: isSelected,
    [`${baseClass}--focused`]: isFocused && !isDisabled,
    [`${baseClass}--disabled`]: isDisabled,
    [`${baseClass}--with-divider`]: divider,
    className,
  });

  return (
    <li
      ref={itemRef}
      tabIndex={0}
      className={mergedClassNames}
      onClick={handleClick}
      onMouseOver={handleMouseOver}
      onMouseDown={handleMouseDown}
      onFocus={()=> handleFocus(itemId)}
    >
      <div className={`${baseClass}__content`}>
        {icon && <div className={`${baseClass}__icon`}>{icon}</div>}
        <div className={`${baseClass}__title`}>{children}</div>
      </div>
      {isSelected && (
        <div className={`${baseClass}__icon`}>
          <Icon
            source={Check}
            size={IconSizeName.Medium}
          />
        </div>
      )}
    </li>
  );
};

export default DropdownListItem;
