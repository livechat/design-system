import * as React from 'react';

import cx from 'clsx';

import { Button } from '../Button';
import { Tooltip } from '../Tooltip';

import { IActionBarItem } from './types';

import styles from './ActionBar.module.scss';

const baseClass = 'action-bar__items';
const menuWrapperClass = `${baseClass}__button-wrapper`;

export const ActionBarItem: React.FC<IActionBarItem> = ({
  id,
  option,
  menuItemsKeys,
  isActive,
  vertical,
}) => {
  const mergedButtonClassNames = cx(styles[menuWrapperClass], {
    [styles[`${menuWrapperClass}--hidden`]]: menuItemsKeys.includes(option.key),
    [styles[`${menuWrapperClass}--active`]]: isActive,
    [styles[`${menuWrapperClass}--vertical`]]: vertical,
  });

  const button = (
    <Button
      data-actionBarId={id}
      id={option.key}
      key={option.key}
      title={option.label}
      kind="plain"
      onClick={option.onClick}
      icon={option.element}
      className={styles[`${menuWrapperClass}__button`]}
    />
  );

  if (option.showTooltip) {
    const tooltipVisibility = menuItemsKeys.includes(option.key) && {
      isVisible: false,
    };

    return (
      <div className={mergedButtonClassNames}>
        <Tooltip
          kind="invert"
          placement={vertical ? 'left' : 'bottom'}
          triggerClassName={styles[`${baseClass}__tooltip`]}
          triggerRenderer={() => button}
          floatingStrategy="fixed"
          useClickHookProps={{
            ignoreMouse: true,
          }}
          hoverOnDelay={800}
          hoverOffDelay={0}
          {...tooltipVisibility}
        >
          <div>{option.label}</div>
        </Tooltip>
      </div>
    );
  }

  return <div className={mergedButtonClassNames}>{button}</div>;
};
