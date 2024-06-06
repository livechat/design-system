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
  isHidden,
  isActive,
  vertical,
}) => {
  const mergedButtonClassNames = cx(styles[menuWrapperClass], {
    [styles[`${menuWrapperClass}--hidden`]]: isHidden,
    [styles[`${menuWrapperClass}--active`]]: isActive,
    [styles[`${menuWrapperClass}--vertical`]]: vertical,
  });

  const button = (
    <Button
      data-actionbarid={id}
      id={option.key}
      key={option.key}
      title={option?.showTooltip ? undefined : option.label}
      kind="plain"
      onClick={option.onClick}
      icon={option.element}
      disabled={isHidden}
      className={styles[`${menuWrapperClass}__button`]}
    />
  );

  if (option.showTooltip) {
    return (
      <div
        data-testid={option.key}
        key={option.key}
        className={mergedButtonClassNames}
      >
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
        >
          <div>{option.label}</div>
        </Tooltip>
      </div>
    );
  }

  return (
    <div data-testid={option.key} className={mergedButtonClassNames}>
      {button}
    </div>
  );
};
