import * as React from 'react';

import { MoreHoriz } from '@livechat/design-system-icons/react/tabler';
import cx from 'clsx';

import { ActionMenu, ActionMenuItem } from '../ActionMenu';
import { Icon } from '../Icon';

import styles from './ActionBar.module.scss';

export interface IActionBarProps {
  /**
   * The CSS class for menu container
   */
  className?: string;
  /**
   * The unique id key
   */
  id?: string;
  /**
   * Array of action bar options
   */
  options: Array<{
    key: string;
    element: React.ReactNode;
    onClick: () => void;
  }>;
}

const baseClass = 'action-bar';

export const ActionBar: React.FC<IActionBarProps> = ({
  className,
  id = 'action-bar-area',
  options,
}) => {
  const [menuItems, setMenuItems] = React.useState<string[]>([]);
  const mergedClassNames = cx(styles[baseClass], className);
  const observerOptions = {
    root: document.querySelector(`${id}`),
    threshold: 1,
  };

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.map((entry) => {
      if (!entry.isIntersecting) {
        entry.target.classList.add(
          `${styles[`${baseClass}__items__button--hidden`]}`
        );

        const temp = menuItems;

        if (!temp.includes(entry.target.id)) {
          temp.push(entry.target.id);
          setMenuItems([...temp]);
        }
      } else {
        entry.target.classList.remove(
          `${styles[`${baseClass}__items__button--hidden`]}`
        );

        const temp = menuItems;

        if (temp.includes(entry.target.id)) {
          const index = temp.indexOf(entry.target.id);
          temp.splice(index, 1);
          setMenuItems([...temp]);
        }
      }
    });
  };

  const observer = new IntersectionObserver(
    handleIntersection,
    observerOptions
  );

  React.useEffect(() => {
    const target = document.querySelectorAll(
      `.${styles[`${baseClass}__items__button`]}`
    );

    target.forEach((e) => observer.observe(e));
  }, [menuItems]);

  const getMenuItems = (items: string[]) => {
    return options.filter((row) => items.find((i) => i === row.key));
  };

  return (
    <div id={id} className={mergedClassNames}>
      <div className={styles[`${baseClass}__items`]}>
        {options.map((o) => (
          <button
            id={o.key}
            key={o.key}
            type="button"
            className={styles[`${baseClass}__items__button`]}
          >
            {o.element}
          </button>
        ))}
      </div>
      {menuItems.length !== 0 && (
        <div className={styles[`${baseClass}__menu-wrapper`]}>
          <ActionMenu
            options={getMenuItems(menuItems)}
            triggerRenderer={<Icon source={MoreHoriz} kind="primary" />}
          />
        </div>
      )}
    </div>
  );
};
