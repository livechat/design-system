import * as React from 'react';
import cx from 'clsx';
import { Popover } from '../Popover';
import styles from './ActionMenu.module.scss';
import { KeyCodes } from '../../utils/keyCodes';
import { Placement } from '@floating-ui/react-dom';

export interface ActionMenuItemsProps {
  key: string;
  element: string | React.ReactElement;
  disabled?: boolean;
  withDivider?: boolean;
  onClick: () => void;
}

export interface ActionMenuProps {
  className?: string;
  options: ActionMenuItemsProps[];
  triggerRenderer: React.ReactNode;
  placement?: Placement;
}

const baseClass = 'action-menu';

export const ActionMenu: React.FC<ActionMenuProps> = ({
  className,
  options,
  triggerRenderer,
  placement = 'bottom-end',
  ...props
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const indexRef = React.useRef(-1);

  const getIndex = (val: number) => {
    indexRef.current = indexRef.current + val;

    while (options[indexRef.current].disabled) {
      indexRef.current = indexRef.current + val;
    }

    return indexRef.current;
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === KeyCodes.arrowUp && indexRef.current > 0) {
      e.preventDefault();
      indexRef.current = getIndex(-1);
      document.getElementById(`list-item-${indexRef.current}`)?.focus();
    }

    if (e.key === KeyCodes.arrowDown && indexRef.current + 1 < options.length) {
      e.preventDefault();
      indexRef.current = getIndex(+1);
      document.getElementById(`list-item-${indexRef.current}`)?.focus();
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

  const handleItemClick = (itemOnClick: () => void) => {
    itemOnClick();
    setIsVisible(false);
  };

  return (
    <Popover
      isVisible={isVisible}
      placement={placement}
      onClose={() => setIsVisible(false)}
      triggerRenderer={() => (
        <button
          data-testid="action-menu-trigger-button"
          className={styles[`${baseClass}__trigger-button`]}
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
      >
        {options.map((o, i) => (
          <li key={o.key} role="none">
            <button
              id={`list-item-${i}`}
              data-testid={o.key}
              tabIndex={-1}
              key={o.key}
              disabled={o.disabled}
              onClick={() => handleItemClick(o.onClick)}
              role="menuitem"
              className={cx(styles[`${baseClass}__list__item`], {
                [styles[`${baseClass}__list__item--disabled`]]: o.disabled,
                [styles[`${baseClass}__list__item--with-divider`]]:
                  o.withDivider,
              })}
            >
              {o.element}
            </button>
          </li>
        ))}
      </ul>
    </Popover>
  );
};
