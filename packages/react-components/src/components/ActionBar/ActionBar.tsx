import * as React from 'react';

import { ChevronDown } from '@livechat/design-system-icons';
import cx from 'clsx';

import { IActionMenuOption } from 'components/ActionMenu/types';

import { ActionMenu, ActionMenuItem } from '../ActionMenu';
import { Button } from '../Button';
import { Icon } from '../Icon';

import { ActionBarItem } from './ActionBarItem';
import { IActionBarOption, IActionBarProps } from './types';

import styles from './ActionBar.module.scss';

const baseClass = 'action-bar';
const menuWrapperClass = 'action-bar__menu-wrapper';
const singleElementSize = 44;

export const ActionBar: React.FC<IActionBarProps> = ({
  className,
  id = 'action-bar-area',
  type = 'menu',
  options,
  activeOptionKey,
  vertical,
  menuFooter,
}) => {
  const [visibleItemsCount, setVisibleItemsCount] = React.useState<number>(
    options.length
  );
  const [menuOptions, setMenuOptions] = React.useState<IActionBarOption[]>([]);
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);
  const isScrollType = type === 'scroll';
  const mergedClassNames = cx(
    styles[baseClass],
    className,
    vertical && styles[`${baseClass}--vertical`]
  );
  const shouldDisplayMenu = !isScrollType && menuOptions.length !== 0;

  React.useEffect(() => {
    if (isScrollType) {
      return;
    }

    if (options.length > visibleItemsCount) {
      setMenuOptions(options.slice(visibleItemsCount, options.length));
    } else {
      setMenuOptions([]);
    }
  }, [options, visibleItemsCount]);

  React.useEffect(() => {
    const hasIOSupport = !!window.ResizeObserver;

    if (!isScrollType && hasIOSupport) {
      const observer = new ResizeObserver((entries) => {
        const { width, height } = entries[0].contentRect;
        const containerSize = vertical ? height : width;
        const extraSpacing = menuOptions.length > 0 ? 60 : 0;

        const newVisibleOptionsCount = Math.floor(
          (containerSize - extraSpacing) / singleElementSize
        );

        if (
          newVisibleOptionsCount >= 0 &&
          newVisibleOptionsCount !== visibleItemsCount
        )
          setVisibleItemsCount(newVisibleOptionsCount);
      });

      observer.observe(document.querySelector(`#${id}`)!);

      return () => observer.disconnect();
    }
  }, [menuOptions, isScrollType, visibleItemsCount]);

  const getMenuItems = React.useCallback(() => {
    return menuOptions.reduce(
      (acc: IActionMenuOption[], o: IActionBarOption) => {
        if (!o.hideInMenu) {
          const item = {
            key: o.key,
            element: (
              <ActionMenuItem leftNode={o.element}>{o.label}</ActionMenuItem>
            ),
            withDivider: o.withDivider,
            onClick: o.onClick,
          };
          acc.push(item);
        }

        return acc;
      },
      []
    );
  }, [menuOptions]);

  const buttonElement = menuOptions.find((o) => o.key === activeOptionKey);

  return (
    <div id={id} className={mergedClassNames}>
      <div
        className={cx(styles[`${baseClass}__items`], {
          [styles[`${baseClass}__items--scroll`]]: isScrollType,
        })}
      >
        {options.slice(0, visibleItemsCount).map((o) => (
          <ActionBarItem
            option={o}
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
        >
          <ActionMenu
            selectedOptions={activeOptionKey ? [activeOptionKey] : []}
            onOpen={() => setIsMenuOpen(true)}
            onClose={() => setIsMenuOpen(false)}
            floatingStrategy="fixed"
            placement={vertical ? 'left-start' : 'bottom-end'}
            options={getMenuItems()}
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
                    source={ChevronDown}
                    kind="primary"
                    className={cx(
                      styles[`${menuWrapperClass}__button__icon`],
                      isMenuOpen &&
                        styles[`${menuWrapperClass}__button__icon--open`]
                    )}
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
