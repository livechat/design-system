import * as React from 'react';

import { Placement } from '@floating-ui/react-dom';
import cx from 'clsx';

import { KeyCodes } from '../../utils/keyCodes';
import { Popover } from '../Popover';

import { IActionMenuOption } from './types';

import styles from './ActionMenu.module.scss';

export interface ActionMenuProps {
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
}

const baseClass = 'action-menu';

export const ActionMenu: React.FC<ActionMenuProps> = ({
  className,
  triggerClassName,
  options,
  triggerRenderer,
  placement = 'bottom-end',
  openedOnInit = false,
  keepOpenOnClick,
  ...props
}) => {
  const [isVisible, setIsVisible] = React.useState(openedOnInit);
  const indexRef = React.useRef<number>(-1);
  const ref = React.useRef<HTMLUListElement | null>(null);

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

  const focusElement = (val: number) => {
    indexRef.current = getIndex(val);
    const elements = ref.current?.children;
    const elementToFocus =
      elements && (elements[indexRef.current].children[0] as HTMLButtonElement);

    return elementToFocus && elementToFocus.focus();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === KeyCodes.arrowUp && indexRef.current > 0) {
      e.preventDefault();
      focusElement(-1);
    }

    if (e.key === KeyCodes.arrowDown && indexRef.current + 1 < options.length) {
      e.preventDefault();
      focusElement(+1);
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
        className={cx(styles[`${baseClass}__list`], className)}
        role="menu"
        aria-hidden={!isVisible}
        ref={ref}
      >
        {options.map(getOptionElement)}
      </ul>
    </Popover>
  );
};
