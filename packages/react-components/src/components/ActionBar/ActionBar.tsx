import * as React from 'react';

import { ChevronDown, ChevronLeft } from '@livechat/design-system-icons';
import cx from 'clsx';

import { ActionMenu, ActionMenuItem } from '../ActionMenu';
import { Button } from '../Button';
import { Icon } from '../Icon';

import { ActionBarItem } from './ActionBarItem';
import { IActionBarProps } from './types';

import styles from './ActionBar.module.scss';

const baseClass = 'action-bar';

export const ActionBar: React.FC<IActionBarProps> = ({
  className,
  id = 'action-bar-area',
  type = 'menu',
  options,
  activeOptionKey,
  vertical,
}) => {
  const [menuItemsKeys, setMenuItemsKeys] = React.useState<string[]>([]);
  const isScrollType = type === 'scroll';
  const mergedClassNames = cx(
    styles[baseClass],
    className,
    vertical && styles[`${baseClass}--vertical`]
  );
  const menuWrapperClass = `${baseClass}__menu-wrapper`;
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
  }, [menuItemsKeys, isScrollType]);

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

  const buttonElement = options
    .filter((row) => menuItemsKeys.find((i) => i === row.key))
    .find((o) => o.key === activeOptionKey);

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
            vertical={vertical}
          />
        ))}
      </div>
      {shouldDisplayMenu && (
        <div className={styles[menuWrapperClass]}>
          <ActionMenu
            placement={vertical ? 'left-end' : 'bottom-end'}
            options={getMenuItems(menuItemsKeys)}
            triggerClassName={cx(
              vertical && styles[`${menuWrapperClass}__trigger-vertical`]
            )}
            triggerRenderer={
              <Button
                className={cx(
                  styles[`${menuWrapperClass}__button`],
                  buttonElement && styles[`${menuWrapperClass}__button--active`]
                )}
                kind="plain"
                icon={
                  <Icon
                    source={vertical ? ChevronLeft : ChevronDown}
                    kind="primary"
                  />
                }
                iconPosition="right"
              >
                {buttonElement && (
                  <div
                    className={cx(
                      styles[`${menuWrapperClass}__button__with-item`]
                    )}
                  >
                    {buttonElement.element}
                  </div>
                )}
              </Button>
            }
          />
        </div>
      )}
    </div>
  );
};
