import {
  FC,
  ReactNode,
  ReactElement,
  useState,
  useEffect,
  useRef,
} from 'react';
import cx from 'clsx';
import { Popover } from '../Popover';
import styles from './ActionMenu.module.scss';
import { KeyCodes } from '../../utils/keyCodes';

export interface ActionMenuItemsProps {
  key: string;
  element: ReactElement;
  disabled?: boolean;
  withDivider?: boolean;
  onClick: () => void;
}

export interface ActionMenuProps {
  className?: string;
  options: ActionMenuItemsProps[];
  triggerRenderer: ReactNode;
}

const baseClass = 'action-menu';

export const ActionMenu: FC<ActionMenuProps> = ({
  className,
  options,
  triggerRenderer,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const indexRef = useRef(-1);

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

  useEffect(() => {
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
      placement="bottom-end"
      onClose={() => setIsVisible(false)}
      triggerRenderer={() => (
        <button
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
