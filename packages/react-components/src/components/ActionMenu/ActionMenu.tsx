import { FC, ReactNode, ReactElement } from 'react';
import cx from 'clsx';
import { Popover } from '../Popover';
import styles from './ActionMenu.module.scss';
import { useState } from 'react';

export interface ActionMenuItemsProps {
  key: string;
  element: ReactElement;
  disabled?: boolean;
  withDivider?: boolean;
  onClick: () => void;
}

export interface ActionMenuProps {
  options: ActionMenuItemsProps[];
  triggerRenderer: ReactNode;
}

const baseClass = 'action-menu';

export const ActionMenu: FC<ActionMenuProps> = ({
  options,
  triggerRenderer,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleTriggerClick = () => {
    setIsVisible(true);
  };

  const handleItemClick = (onClick) => {
    onClick();
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
      <ul className={styles[`${baseClass}__list`]} role="menu">
        {options.map((i) => (
          <li role="none">
            <button
              disabled={i.disabled}
              onClick={() => handleItemClick(i.onClick)}
              role="menuitem"
              className={cx(styles[`${baseClass}__list__item`], {
                [styles[`${baseClass}__list__item--disabled`]]: i.disabled,
                [styles[`${baseClass}__list__item--with-divider`]]:
                  i.withDivider,
              })}
            >
              {i.element}
            </button>
          </li>
        ))}
      </ul>
    </Popover>
  );
};
