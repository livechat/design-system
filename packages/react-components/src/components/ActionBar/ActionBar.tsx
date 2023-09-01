import * as React from 'react';

import { ChevronDown } from '@livechat/design-system-icons/react/tabler';
import cx from 'clsx';

import { ActionMenu, ActionMenuItem } from '../ActionMenu';
import { Icon } from '../Icon';

import { ActionBarItem, IActionBarOption } from './ActionBarItem';

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
  options: IActionBarOption[];
  /**
   * Set the key for active element
   */
  activeOptionKey?: string | null;
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
  activeOptionKey,
}) => {
  const [menuItemsKeys, setMenuItemsKeys] = React.useState<string[]>([]);
  const isScrollType = type === 'scroll';
  const mergedClassNames = cx(styles[baseClass], className);
  const observerOptions = {
    root: document.querySelector(`${id}`),
    threshold: 1,
  };
  const shouldDisplayMenu = !isScrollType && menuItemsKeys.length !== 0;

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.map((entry) => {
      const entryExistInMenu = menuItemsKeys.includes(entry.target.id);

      if (!entry.isIntersecting) {
        entry.target.setAttribute('tabindex', '-1');

        if (!entryExistInMenu) {
          setMenuItemsKeys((prevItemKeys) => [
            ...prevItemKeys,
            entry.target.id,
          ]);
        }

        return;
      }

      entry.target.removeAttribute('tabindex');

      if (entryExistInMenu) {
        setMenuItemsKeys(menuItemsKeys.filter((i) => i !== entry.target.id));
      }
    });
  };

  React.useEffect(() => {
    const hasIOSupport = !!window.IntersectionObserver;

    if (!isScrollType && hasIOSupport) {
      const target = document.querySelectorAll(
        `.${styles[`${baseClass}__items__button`]}`
      );

      const observer = new IntersectionObserver(
        handleIntersection,
        observerOptions
      );

      target.forEach((e) => observer.observe(e));

      return () => observer.disconnect();
    }
  }, [menuItemsKeys]);

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

  return (
    <div id={id} className={mergedClassNames}>
      <div
        className={cx(styles[`${baseClass}__items`], {
          [styles[`${baseClass}__items--scroll`]]: isScrollType,
        })}
      >
        {options.map((o) => (
          <ActionBarItem
            option={o}
            menuItemsKeys={menuItemsKeys}
            activeOptionKey={activeOptionKey}
          />
        ))}
      </div>
      {shouldDisplayMenu && (
        <div className={styles[`${baseClass}__menu-wrapper`]}>
          <ActionMenu
            options={getMenuItems(menuItemsKeys)}
            triggerRenderer={<Icon source={ChevronDown} kind="primary" />}
          />
        </div>
      )}
    </div>
  );
};
