import * as React from 'react';

import { Placement } from '@floating-ui/react-dom';
import cx from 'clsx';

import { KeyCodes } from '../../utils/keyCodes';
import { Popover } from '../Popover';

import { IActionMenuOption } from './types';

import styles from './ActionMenu.module.scss';

export interface ActionMenuProps {
  /**
   * Set the unique id for every `ActionMenu` visible on the same view
   */
  id: string;
  /**
   * The CSS class for menu container
   */
  className?: string;
  /**
   * The CSS class for trigger element
   */
  triggerClassName?: string;
  /**
   * Array of menu options
   */
  options: IActionMenuOption[];
  /**
   * Trigger element
   */
  triggerRenderer: React.ReactElement;
  /**
   * The menu placement
   */
  placement?: Placement;
  /**
   * Will open menu on component initialization
   */
  openedOnInit?: boolean;
  /**
   * Menu will stay open after option click
   */
  keepOpenOnClick?: boolean;
  /**
   * Set the keys array for active elements
   */
  activeOptionKeys?: string[];
}

const baseClass = 'action-menu';

export const ActionMenu: React.FC<ActionMenuProps> = ({
  id,
  className,
  triggerClassName,
  options,
  triggerRenderer,
  placement = 'bottom-end',
  openedOnInit = false,
  keepOpenOnClick,
  activeOptionKeys,
  ...props
}) => {
  const [isVisible, setIsVisible] = React.useState(openedOnInit);
  const indexRef = React.useRef(-1);

  const getIndex = (val: number): number => {
    const currentValue = indexRef.current;
    let newValue = currentValue + val;

    while (options[newValue]?.disabled || options[newValue]?.groupHeader) {
      newValue += val;

      if (newValue === -1) {
        newValue = currentValue;
        break;
      }
    }

    return newValue;
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === KeyCodes.arrowUp && indexRef.current > 0) {
      e.preventDefault();
      indexRef.current = getIndex(-1);
      document.getElementById(`${id}-${indexRef.current}`)?.focus();
    }

    if (e.key === KeyCodes.arrowDown && indexRef.current + 1 < options.length) {
      e.preventDefault();
      indexRef.current = getIndex(+1);
      document.getElementById(`${id}-${indexRef.current}`)?.focus();
    }
  };

  React.useEffect(() => {
    if (isVisible) {
      document.addEventListener('keydown', onKeyDown);

      return () => document.removeEventListener('keydown', onKeyDown);
    } else {
      indexRef.current = -1;
    }
  }, [isVisible, onKeyDown]);

  const handleTriggerClick = () => {
    setIsVisible(true);
  };

  const handleItemClick = (index: number, itemOnClick?: () => void) => {
    indexRef.current = index;
    itemOnClick?.();

    if (!keepOpenOnClick) {
      setIsVisible(false);
    }
  };

  const getOptionElement = (option: IActionMenuOption, index: number) => {
    if (option.groupHeader) {
      return (
        <li
          key={option.key}
          role="none"
          className={styles[`${baseClass}__list__group-header`]}
        >
          {option.element}
        </li>
      );
    }

    return (
      <li key={option.key} role="none">
        <button
          id={`${id}-${index}`}
          data-testid={option.key}
          tabIndex={-1}
          key={option.key}
          disabled={option.disabled}
          onClick={() => handleItemClick(index, option.onClick)}
          role="menuitem"
          className={cx(styles[`${baseClass}__list__item`], {
            [styles[`${baseClass}__list__item--disabled`]]: option.disabled,
            [styles[`${baseClass}__list__item--with-divider`]]:
              option.withDivider,
            [styles[`${baseClass}__list__item--active`]]:
              activeOptionKeys?.includes(option.key),
          })}
        >
          {option.element}
        </button>
      </li>
    );
  };

  return (
    <Popover
      isVisible={isVisible}
      placement={placement}
      onClose={() => setIsVisible(false)}
      triggerRenderer={() => (
        <button
          data-testid="action-menu-trigger-button"
          className={cx(
            styles[`${baseClass}__trigger-button`],
            triggerClassName
          )}
          onClick={handleTriggerClick}
        >
          {triggerRenderer}
        </button>
      )}
    >
      <ul
        {...props}
        id={id}
        className={cx(styles[`${baseClass}__list`], className)}
        role="menu"
        aria-hidden={!isVisible}
      >
        {options.map(getOptionElement)}
      </ul>
    </Popover>
  );
};
