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
const menuWrapperClass = 'action-bar__menu-wrapper';

export const ActionBar: React.FC<IActionBarProps> = ({
  className,
  id = 'action-bar-area',
  type = 'menu',
  options,
  activeOptionKey,
  vertical,
  menuFooter,
}) => {
  const [menuItemsKeys, setMenuItemsKeys] = React.useState<string[]>([]);
  const [menuPosition, setMenuPosition] = React.useState<number>(0);
  const isScrollType = type === 'scroll';
  const mergedClassNames = cx(
    styles[baseClass],
    className,
    vertical && styles[`${baseClass}--vertical`]
  );
  const observerOptions = {
    root: document.querySelector(`${id}`),
    threshold: 1,
  };
  const shouldDisplayMenu = !isScrollType && menuItemsKeys.length !== 0;

  React.useEffect(() => {
    if (isScrollType) {
      return;
    }

    // Single element size with margin
    const singleElementSize = 44;
    // Extra spacing to include for menu placement
    const menuPlacementSpacing = 4;
    const allOptionsCount = options.length;
    const hiddenOptionsCount = menuItemsKeys.length;
    const visibleOptionsCount = allOptionsCount - hiddenOptionsCount;
    const position =
      visibleOptionsCount * singleElementSize + menuPlacementSpacing;

    setMenuPosition(position);
  }, [menuItemsKeys, options, isScrollType]);

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
        `button[data-actionBarId='${id}']`
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

  const getMenuPosition = (position: number, vertical?: boolean) => {
    if (vertical) {
      return {
        top: position,
      };
    }

    return {
      left: position,
    };
  };

  return (
    <div id={id} className={mergedClassNames}>
      <div
        className={cx(styles[`${baseClass}__items`], {
          [styles[`${baseClass}__items--scroll`]]: isScrollType,
          [styles[`${baseClass}__items--with-menu`]]: shouldDisplayMenu,
        })}
      >
        {options.map((o) => (
          <ActionBarItem
            id={id}
            option={o}
            menuItemsKeys={menuItemsKeys}
            isActive={o.key === activeOptionKey}
            vertical={vertical}
          />
        ))}
      </div>
      {shouldDisplayMenu && (
        <div
          className={cx(
            styles[menuWrapperClass],
            buttonElement && styles[`${menuWrapperClass}--active`],
            vertical && styles[`${menuWrapperClass}--vertical`]
          )}
          style={getMenuPosition(menuPosition, vertical)}
        >
          <ActionMenu
            floatingStrategy="fixed"
            placement={vertical ? 'left-start' : 'bottom-end'}
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
            footer={menuFooter}
          />
        </div>
      )}
    </div>
  );
};
