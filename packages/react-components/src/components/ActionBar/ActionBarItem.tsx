import * as React from 'react';

import cx from 'clsx';

import { Button } from '../Button';
import { Tooltip } from '../Tooltip';

import { IActionBarItem } from './types';

import styles from './ActionBar.module.scss';

const baseClass = 'action-bar__items';

export const ActionBarItem: React.FC<IActionBarItem> = ({
  id,
  option,
  menuItemsKeys,
  activeOptionKey,
  vertical,
}) => {
  const mergedButtonClassNames = cx(styles[`${baseClass}__button`], {
    [styles[`${baseClass}__button--hidden`]]: menuItemsKeys.includes(
      option.key
    ),
    [styles[`${baseClass}__button--active`]]: option.key === activeOptionKey,
  });

  if (option.showTooltip) {
    const tooltipVisibility = menuItemsKeys.includes(option.key) && {
      isVisible: false,
    };

    return (
      <Tooltip
        kind="invert"
        placement={vertical ? 'left' : 'bottom'}
        triggerClassName={styles[`${baseClass}__tooltip`]}
        triggerRenderer={() => (
          <Button
            data-actionBarId={id}
            id={option.key}
            key={option.key}
            title={option.label}
            kind="plain"
            className={mergedButtonClassNames}
            onClick={option.onClick}
            icon={option.element}
          />
        )}
        {...tooltipVisibility}
      >
        <div>{option.label}</div>
      </Tooltip>
    );
  }

  return (
    <Button
      data-actionBarId={id}
      id={option.key}
      key={option.key}
      title={option.label}
      kind="plain"
      className={mergedButtonClassNames}
      onClick={option.onClick}
      icon={option.element}
    />
  );
};
