import * as React from 'react';

import { MoreHoriz } from '@livechat/design-system-icons/react/tabler';
import cx from 'clsx';

import { ActionMenu, ActionMenuItem } from '../ActionMenu';
import { Icon } from '../Icon';
import { Tooltip } from '../Tooltip';

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
    label?: string;
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
  const [menuItemsKeys, setMenuItemsKeys] = React.useState<string[]>([]);
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

        const newMenuItems = menuItemsKeys;

        if (!newMenuItems.includes(entry.target.id)) {
          newMenuItems.push(entry.target.id);
          setMenuItemsKeys([...newMenuItems]);
        }

        return;
      }

      entry.target.classList.remove(
        `${styles[`${baseClass}__items__button--hidden`]}`
      );
      entry.target.removeAttribute('tabindex');

      const newMenuItems = menuItemsKeys;

      if (newMenuItems.includes(entry.target.id)) {
        const index = newMenuItems.indexOf(entry.target.id);
        newMenuItems.splice(index, 1);
        setMenuItemsKeys([...newMenuItems]);
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

  const getMenuItems = (keys: string[]) => {
    const filteredOptions = options.filter((row) =>
      keys.find((i) => i === row.key)
    );

    return filteredOptions.map((o) => {
      return {
        key: o.key,
        element: (
          <ActionMenuItem leftNode={o.element}>{o.label}</ActionMenuItem>
        ),
        onClick: o.onClick,
      };
    });
  };

  const getItem = (option) => {
    if (option.label) {
      return (
        <Tooltip
          triggerRenderer={() => (
            <button
              id={option.key}
              key={option.key}
              title={option.label}
              type="button"
              className={styles[`${baseClass}__items__button`]}
              onClick={option.onClick}
            >
              {option.element}
            </button>
          )}
        >
          <div>{option.label}</div>
        </Tooltip>
      );
    }

    return (
      <button
        id={option.key}
        key={option.key}
        title={option.label}
        type="button"
        className={styles[`${baseClass}__items__button`]}
        onClick={option.onClick}
      >
        {option.element}
      </button>
    );
  };

  return (
    <div id={id} className={mergedClassNames}>
      <div
        className={cx(styles[`${baseClass}__items`], {
          [styles[`${baseClass}__items--scroll`]]: isScrollType,
        })}
      >
        {options.map((o) => getItem(o))}
      </div>
      {!isScrollType && menuItemsKeys.length !== 0 && (
        <div className={styles[`${baseClass}__menu-wrapper`]}>
          <ActionMenu
            options={getMenuItems(menuItemsKeys)}
            triggerRenderer={<Icon source={MoreHoriz} kind="primary" />}
          />
        </div>
      )}
    </div>
  );
};
