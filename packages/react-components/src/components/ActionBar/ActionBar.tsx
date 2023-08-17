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
    title?: string;
    onClick: () => void;
  }>;
  /**
   * Set 'scroll' to disable menu and enable scroll
   */
  type?: 'menu' | 'scroll';
}

const baseClass = 'action-bar';

export const ActionBar: React.FC<IActionBarProps> = ({
  className,
  id = 'action-bar-area',
  type = 'menu',
  options,
}) => {
  const [menuItems, setMenuItems] = React.useState<string[]>([]);
  const isScrollType = type === 'scroll';
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
        entry.target.setAttribute('tabindex', '-1');

        const newMenuItems = menuItems;

        if (!newMenuItems.includes(entry.target.id)) {
          newMenuItems.push(entry.target.id);
          setMenuItems([...newMenuItems]);
        }

        return;
      }

      entry.target.classList.remove(
        `${styles[`${baseClass}__items__button--hidden`]}`
      );
      entry.target.removeAttribute('tabindex');

      const newMenuItems = menuItems;

      if (newMenuItems.includes(entry.target.id)) {
        const index = newMenuItems.indexOf(entry.target.id);
        newMenuItems.splice(index, 1);
        setMenuItems([...newMenuItems]);
      }
    });
  };

  const observer = new IntersectionObserver(
    handleIntersection,
    observerOptions
  );

  React.useEffect(() => {
    if (!isScrollType) {
      const target = document.querySelectorAll(
        `.${styles[`${baseClass}__items__button`]}`
      );

      target.forEach((e) => observer.observe(e));
    }

    return () => observer.disconnect();
  }, []);

  const getMenuItems = (items: string[]) => {
    return options.filter((row) => items.find((i) => i === row.key));
  };

  return (
    <div id={id} className={mergedClassNames}>
      <div
        className={cx(styles[`${baseClass}__items`], {
          [styles[`${baseClass}__items--scroll`]]: isScrollType,
        })}
      >
        {options.map((o) => (
          <button
            id={o.key}
            key={o.key}
            title={o.title}
            type="button"
            className={styles[`${baseClass}__items__button`]}
            onClick={o.onClick}
          >
            {o.element}
          </button>
        ))}
      </div>
      {!isScrollType && menuItems.length !== 0 && (
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
